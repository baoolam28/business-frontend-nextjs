import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authAPI from "./api/auth";
import Google from "next-auth/providers/google";


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
          if (res.statusCode === 200) {
            console.log("Response Data:", res.data);
            const user = res.data.userInfo;
            if (user) {
              return {
                ...user,
                accessToken: res.data.access_token,
              };
            }
          } else {
            console.error("Authentication failed:", res.message);
            return null; // Return null if login fails
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const roleMatch = user.role ? user.role.match(/roleName=([A-Z_]+)/) : null;
        const role = roleMatch ? roleMatch[1] : null;
        console.log("User Data:", user);

        // Update the existing token object
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
    },
    async session({ session, token}) {
      session.user = token.user;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          console.log("User___: ", JSON.stringify(user));
          console.log("Profile___: ", JSON.stringify(profile));
          return true; 
        } catch (error) {
          console.error("Error during authentication:", error);
          return false; 
        }
      }
      return true;
    },

  },
  cookies: {
    sessionToken: {
      name: 'authjs.session-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
  },
  pages: {
    signIn: '/login', // Define your custom sign-in page if needed
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', 
});
