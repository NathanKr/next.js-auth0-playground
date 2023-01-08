import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Profile from "../src/profile";

export default function Home() {
  const userInfo = useUser();

  return (
    <>
      <Link href="/protected">Protected page</Link>
      <br />
      <Link href="/admin">Admin page</Link>
      <br />

      {userInfo.user ? (
        <>
          <Link href="/api/auth/me">Me api</Link>
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
      <Profile />
    </>
  );
}
