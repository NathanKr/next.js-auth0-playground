import { useUser } from "@auth0/nextjs-auth0/client";
import Profile from "../src/profile";

export default function Home() {
  const userInfo = useUser();
  console.log(userInfo);

  return (
    <>
      {userInfo.user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
      <Profile />
    </>
  );
}
