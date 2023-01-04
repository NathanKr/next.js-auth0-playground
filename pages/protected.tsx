import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const Protected = () => {
    return (
        <div>
            Only loggedin users can access this
        </div>
    );
};

export default withPageAuthRequired(Protected);