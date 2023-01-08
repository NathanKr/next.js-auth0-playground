import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Admin  = () => {
    return (
        <div>
            <h2>Admin page</h2>
            This page can be accessed only by nathan
        </div>
    );
};

export default withPageAuthRequired(Admin)