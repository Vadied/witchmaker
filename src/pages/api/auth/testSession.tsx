import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
    res.status(200).json({ message: "Success", session });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default handler;
