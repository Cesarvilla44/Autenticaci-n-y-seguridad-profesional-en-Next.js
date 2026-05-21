import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protege /dashboard y todas sus subrutas
  matcher: ["/dashboard/:path*"],
};
