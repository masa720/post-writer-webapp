import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isAuth = !!req.auth;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
});

export const config = {
  matcher: ["/dashboard/:path", "/editor/:path", "/login", "/register"],
};