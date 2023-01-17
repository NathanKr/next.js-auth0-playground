// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

/*

only logged in user can access this api because of withApiAuthRequired 
otherwise you will get http status code of 401

*/

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession(req, res);
  console.log("************* session *************");
  console.log(session);
  console.log("************* user *************");
  console.log(session?.user);
  console.log("************* email *************");
  console.log(session?.user.email);
  res.status(200).json({ name: "John Doe protected" });
});
