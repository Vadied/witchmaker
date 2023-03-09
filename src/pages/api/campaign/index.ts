import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongo/dbConnect";

import { ResponseData } from "@/models/response.model";

import { deleteCampaign, getCampaigns, postCampaign} from "@/lib/campaigns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("handler")
  dbConnect().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getCampaigns(req, res);
      break;
    case "POST":
      postCampaign(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
