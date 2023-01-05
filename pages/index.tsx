import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Profile from "../src/profile";

export default function Home() {
  const userInfo = useUser();

  return (
    <>
      <Link href="/protected">Protected</Link>
      <br />
      <Link href="/admin">Admin</Link>
      <br />
      {userInfo.user ? (
        <Link href="/api/auth/logout">Logout</Link>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
      <Profile />
    </>
  );
}
