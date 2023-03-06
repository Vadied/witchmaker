import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/dbConnect";

import { ResponseData } from "@/models/response.model";

import { getCharacters, postCharacter} from "@/lib/characters";

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
      getCharacters(req, res);
      break;
    case "POST":
      postCharacter(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
