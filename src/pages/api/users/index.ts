import type { NextApiRequest, NextApiResponse } from "next";

import { ResponseData } from "@/models/response.model";

import dbConnect from "@/lib/dbConnect";
import { getUser, postUser } from "@/lib/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  dbConnect().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
