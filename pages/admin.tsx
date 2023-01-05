import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import React from 'react';

const Admin = () => {
    return (
        <div>
            This page can be accessed only by nathan
        </div>
    );
};

export default withPageAuthRequired(Admin)