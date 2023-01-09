import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

function isAdmin(email: string , email_verified : boolean): boolean {
  // --- if email is verfied you can be sure there one like this 
  // --- otherwise user my signup with same email for email\password
  return email == "natankrasney@gmail.com" && email_verified;
}

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (isAdmin(session?.user.email,session?.user.email_verified)) {
    return res;
  }

  // --- todo nath : how to use generic error page and pass argument ?
  // --- query string is not working
  return NextResponse.redirect(new URL("error-un-authorize", req.url));
});

export const config = {
  matcher: "/admin",
};
