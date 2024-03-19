import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authenticateAdmin } from "@/services/authService";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const res = await authenticateAdmin({
          username: credentials.email,
          password: credentials.password,
        });

        if (res) {
          const { data } = res;

          const sessionData = {
            access: data.access,
            refresh: data.refresh,
            name: data.user.first_name
              ? data.user.first_name + " " + data.user.last_name
              : "",
            email: data.user.email,
            image: data.user.avatar,
            role: data.user.role,
          };

          return sessionData;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    // error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};
