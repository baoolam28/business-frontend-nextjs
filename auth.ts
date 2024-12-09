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
      role: user.role ? user.role.match(/roleName=([A-Z_]+)/)?.[1] : null,
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
      role: user.role ? user.role.match(/roleName=([A-Z_]+)/)?.[1] : null,
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
          if ((res as any).statusCode === 200 && res.data.userInfo) {
            const user = (res as any).data.userInfo;
            return {
              ...user,
              accessToken: (res as any).data.access_token,
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
        token = handleToken(token, user, account.provider, (user as any).accessToken);
      }
      if (user && account?.provider === "credentials") {
        token = handleToken(token, user, account.provider, (user as any).accessToken);
      }
      return token;
    },
    async session({ session, token}) {
      (session as any).user = (token as any).user;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
      
          const googleData = getGoogleData(user, profile);
          const res = await authAPI.googleSignIn(googleData);
          const userInfo = (res as any).data.userInfo;
          if ((res as any).statusCode === 200 && (res as any).data) {
            // Cập nhật lại token và thông tin user từ backend trả về
            (user as any).accessToken = userInfo.access_token;
            (user as any).userId = userInfo.userId;
            (user as any).username = userInfo.username;
            (user as any).fullName = userInfo.fullName;
            (user as any).role = userInfo.role;
            (user as any).active = userInfo.active;
            return true;
          } else {
            console.error("Google user verification failed:", (res as any).message);
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
