import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      authorize: (credentials) => {
        // database look up
        if (credentials.username === "admin" && credentials.password === "password") {
          return {
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
            token: "12345abcde",
            image: null,
          };
        }
        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.token = token.token;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin'
  },
}

export default NextAuth(authOptions);