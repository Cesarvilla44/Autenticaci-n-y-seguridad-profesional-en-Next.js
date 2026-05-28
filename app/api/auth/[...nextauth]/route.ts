import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { verifyFirebaseCredentials } from "../../../../src/utils/firebase-auth";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          // Verificar credenciales con Firebase
          const firebaseUser = await verifyFirebaseCredentials(
            credentials.email,
            credentials.password
          );

          if (!firebaseUser.localId || !firebaseUser.idToken) {
            throw new Error("Credenciales inválidas");
          }

          // Retornar el usuario con los datos de Firebase
          return {
            id: firebaseUser.localId,
            email: firebaseUser.email,
            name: firebaseUser.displayName || credentials.email.split("@")[0],
            image: null,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error de autenticación";
          console.error("Firebase auth error:", errorMessage);
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
