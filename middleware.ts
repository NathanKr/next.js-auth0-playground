import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

function isAdmin(email: string): boolean {
  return email == "natankrasney@gmail.com";
}

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (isAdmin(session?.user.email)) {
    return res;
  }

  return NextResponse.redirect(new URL("/", req.url));
});

export const config = {
  matcher: "/admin",
};
