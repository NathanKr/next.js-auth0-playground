<h2>Motivation</h2>
Add auth0 authnetication (in particular social) to next.js. I follow here <a href='https://auth0.com/docs/quickstart/webapp/nextjs'>auth0 documentation for next.js</a> and get out of the box : email\password and gmail authentication

![Text](./figs/authentication.png)


<h2>important mostly auth0 moving parts</h2>
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Scope</th>
  </tr>
  <tr>
    <td>handleAuth</td>
    <td>auth0 function</td>
    <td> creates the following routes /api/auth/login , /api/auth/logout , /api/auth/callback , /api/auth/me</td>
    <td>api</td>
  </tr>
<tr>
    <td>UserProvider</td>
    <td>auth0 Component (context api)</td>
    <td>Provides user info context</td>
    <td>client</td>
  </tr>
  <tr>
    <td>useUser</td>
    <td>auth0 hook</td>
    <td>provide user info : name \ email \ picture from UserProvider</td>
    <td>client</td>
  </tr>
  <tr>
    <td>withPageAuthRequired</td>
    <td>auth0 hoc</td>
    <td>restrict access to page to logged in only users</td>
    <td>client page</td>
  </tr>
  <tr>
    <td>withMiddlewareAuthRequired</td>
    <td>auth0 hoc</td>
    <td>restrict access to page to specific logged users. the spcific users are dfined in middleware.ts</td>
    <td>client page</td>
  </tr>
  <tr>
    <td>middleware.ts</td>
    <td>next.js middleware</td>
    <td>intercept request and impose logic - here it restruct access to admin page to specific user</td>
    <td>server</td>
  </tr>
</table>



<h2>Setup steps</h2>
<ol>
<li><h3>create a react project on auth0</h3></li>
<li><h3>get from the project application setting</h3> : Domain , Client ID and Client Secret from the project setting</li>
<li><h3>set the callback url</h3> in the project application setting to : https://localhost:3000/api/auth/callback , http://localhost:3000/api/auth/callback ,https://https://next-js-auth0-playground.vercel.app/api/auth/callback </li>
<li><h3>set the logout url</h3> in the project application setting to : https://localhost:3000 , http://localhost:3000 , https://next-js-auth0-playground.vercel.app</li>
<li><h3>install nextjs-auth0 </h3>: npm install @auth0/nextjs-auth0</li>
<li><h3>add .env.local file </h3>on the project root with the following
<ul>
<li>AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'. this is A long secret value used to encrypt the session cookie. You can generate a suitable string using openssl rand -hex 32 on the command line</li>   
<li>AUTH0_BASE_URL='http://localhost:3000'. this is the base URL of your application on development. use https://next-js-auth0-playground.vercel.app for production</li>
<li>AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN'. This is The URL of your Auth0 tenant domain. If you are using a Custom Domain with Auth0, set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab.</li>
<li>AUTH0_CLIENT_ID='YOUR_CLIENT_ID'. This is Your Auth0 application's Client ID</li>
<li>AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'. This is your Auth0 application's Client Secret</li>
</ul>

<li>
<h3>Add the dynamic API route</h3>
Create an auth directory under the pages/api directory. Then, create a [...auth0].ts file under the newly created auth directory. The path to your dynamic API route file should then be pages/api/auth/[...auth0].ts.

```typescript
// pages/api/auth/[...auth0].js
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();
```

Under the hood, handleAuth() creates the following routes:

    /api/auth/login: The route used to perform login with Auth0.
    /api/auth/logout: The route used to log the user out.
    /api/auth/callback: The route Auth0 will redirect the user to after a successful login.
    /api/auth/me: The route to fetch the user profile from.
</li>

<li>
<h3>Add the UserProvider component</h3>
On the frontend side, the SDK uses React Context to manage the authentication state of your users. To make that state available to all your pages, you need to override the App component and wrap its inner component with a UserProvider. Create the file pages/_app.js as follows:

```typescript
// pages/_app.js
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
```
The authentication state exposed by UserProvider can be accessed in any component using the useUser() hook.
</li>
<li>
<h3>Add Login to Your Application</h3>

A user can now log in to your application by visiting the /api/auth/login route provided by the SDK. Add a link to your login route.

```html
<Link href="/api/auth/login">Login</Link>
```

<h6>Checkpoint</h6>

Add the login link to your application. When you click it, verify that your Next.js application redirects you to the Auth0 Universal Login page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application.

![Text](./figs/universal-login.png)


</li>

<li>
<h3>Add Logout to Your Application</h3>
Now that you can log in to your Next.js application, you need a way to log out. You can add a link that points to the /api/auth/logout API route. Clicking it redirects your users to your Auth0 logout endpoint (https://YOUR_DOMAIN/v2/logout) and then immediately redirects them back to your application.

```html
<Link href="/api/auth/logout">Logout</Link>
```
</li>

<li>
<h3>Show User Profile Information</h3>
the Auth0 Next.js SDK helps you retrieve the profile information associated with the logged-in user, such as their name or profile picture, to personalize the user interface. The profile information is available through the user property exposed by the useUser() hook. Take this Profile component as an example of how to use it:

```typescript
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
```
</li>
<li>
<h3>Protect a page by authenticated user</h3>
simply use withPageAuthRequired on the page. If you are not logged in you will be re-directed to login page

```typescript
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
```
</li>

<li>
<h3>Protect a page by authenticated user</h3>
access the page is allowed for logged in user which have specific user attributes e.g. email.

```typescript
export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (isAdmin(session?.user.email)) {
    return res;
  }

  return NextResponse.redirect(new URL("/", req.url));
});

export const config = {
  matcher: "/admin",
};
```

</li>

<li>
<h3>Production</h3>
Load the .env.local file to vercel

![Text](./figs/production-environment-variables.png)

 and overide AUTH0_BASE_URL to https://next-js-auth0-playground.vercel.app

</li>

</ol>





<h2>References</h2>
<a href='https://auth0.com/docs/quickstart/webapp/nextjs'>here</a> and <a href='https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md'>here</a>
