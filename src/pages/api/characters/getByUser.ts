import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongo/dbConnect";

import { ResponseData } from "@/models/response.model";

import {getCharactersByUser } from "@/lib/characters";

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
    case "POST":
      getCharactersByUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
