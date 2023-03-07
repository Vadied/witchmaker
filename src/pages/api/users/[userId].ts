import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongo/dbConnect";

import { ResponseData } from "@/models/response.model";

import { getUser, putUser, deleteUser } from "@/lib/users";

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
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
