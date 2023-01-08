import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "styles/top.module.css";

const Top = () => {
  const userInfo = useUser();

  return (
    <div className={styles.top}>
      <Link href="/protected">Protected</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/">Home</Link>

      {userInfo.user ? (
        <>
          <Link href="/api/auth/me">Me api</Link>
          <Link href="/api/auth/logout">Logout</Link>
        </>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </div>
  );
};

export default Top;
