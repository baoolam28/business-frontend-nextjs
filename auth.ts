import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import authAPI from "./api/auth";


const handleToken = (token, user, provider, accessToken) => {
  if (provider === 'google') {
    token.id = user.userId || user.id;
    token.accessToken = accessToken || user.access_token;
    token.user = {
      id: user.userId || user.id,
      username: user.username || user.email,
      fullName: user.fullName || user.name,
      image: user.image || null,
      active: user.active !== undefined ? user.active : true,
    };
    token.role = user.role ? user.role.match(/roleName=([A-Z_]+)/)?.[1] : null;
  } else if (provider === 'credentials') {
    const roleMatch = user.role ? user.role.match(/roleName=([A-Z_]+)/) : null;
    const role = roleMatch ? roleMatch[1] : null;
    token.id = user.userId;
    token.accessToken = user.accessToken;
    token.role = role;
    token.user = {
      id: user.userId,
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      active: user.active,
    };
  }
  return token;
};

const getGoogleData = (user,profile) =>{
  const data = {
    email: user.email,
    name: user.name,
    image: user.image,
    at_hash: profile.at_hash,
  };
  return data;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await authAPI.login(credentials.email, credentials.password);
          if (res.statusCode === 200 && res.data.userInfo) {
            const user = res.data.userInfo;
            return {
              ...user,
              accessToken: res.data.access_token,
            };
          }
          return null; // Trả về null nếu login thất bại
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        // Cập nhật token sau khi đăng nhập Google
        token = handleToken(token, user, account.provider, user.accessToken);
      }
      if (user && account?.provider === "credentials") {
        token = handleToken(token, user, account.provider, user.accessToken);
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
      
          const googleData = getGoogleData(user, profile);
          const res = await authAPI.googleSignIn(googleData);
          
          if (res.statusCode === 200 && res.data) {
            // Cập nhật lại token và thông tin user từ backend trả về
            user.accessToken = res.data.access_token;
            user.userId = res.data.userInfo.userId;
            user.username = res.data.userInfo.username;
            user.fullName = res.data.userInfo.fullName;
            user.role = res.data.userInfo.role;
            user.active = res.data.userInfo.active;
            return true;
          } else {
            console.error("Google user verification failed:", res.message);
            return false;
          }
        } catch (error) {
          console.error("Error during Google authentication:", error);
          return false;
        }
      }
      return true; 
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});
