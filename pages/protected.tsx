import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Protected = () => {
  return (
    <div>
      <h2>Protected page</h2>
      Only logged in users can access this
      <br />
      <Link href="/">Home</Link>
    </div>
  );
};

export default withPageAuthRequired(Protected);
