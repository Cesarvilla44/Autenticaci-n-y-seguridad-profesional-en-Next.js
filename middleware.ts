import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Protege /dashboard y todas sus subrutas
  matcher: ["/dashboard/:path*"],
};
