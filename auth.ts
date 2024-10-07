import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authAPI from "./api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await authAPI.login(credentials.email, credentials.password);

          if (res.statusCode === 200) {
            const user = res.data.userInfo;

            if (user) {
              // Ensure that accessToken is added to the user object
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
        token.id = user.userId;
        token.accessToken = user.accessToken;
        
        // Extract roleName from the role string using a regex match
        const roleMatch = user.role.match(/roleName=([A-Z_]+)/);
        token.role = roleMatch ? roleMatch[1] : null; // Assign the roleName if found
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role; // Attach the role to the session
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: 'authjs.session-token',
      options: {
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Helps mitigate CSRF attacks
      },
    },
  },
  pages: {
    signIn: '/login', // Define your custom sign-in page if needed
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', 
});
