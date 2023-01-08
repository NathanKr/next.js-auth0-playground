import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Profile from "../src/components/profile";

const Protected = () => {
  return (
    <div>
      <h2>Protected page</h2>
      Only logged in users can access this
      <Profile />
    </div>
  );
};

export default withPageAuthRequired(Protected);
