import type { NextApiRequest, NextApiResponse } from "next";

import Campaign from "@/schemas/Campaign";

import { ResponseData } from "@/models/response.model";

import { logError } from "@/lib/logData";

// get : http://localhost:3000/api/campaign
export async function getCampaigns(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const campaigns = await Campaign.find({});
    if (!campaigns) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({ campaigns });
  } catch (error: any) {
    await logError(error, "getCampaigns", req.body);
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// post : http://localhost:3000/api/campaign/getByUser
export async function getCampaignsByUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(404).json({ error: "User not found" });

    const data = await Campaign.find({ createdBy: userId });
    if (!data) return [];

    return data;
  } catch (error: any) {
    await logError(error, "getCampaignsByUser", req.body);
    console.log({ error: "Error While Fetching Data" });
    return [];
  }
}

// get : http://localhost:3000/api/campaign/id
export async function getCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const data = await Campaign.find({});
    if (!data) return res.status(404).json({ error: "Data not Found" });

    res.status(200).json({ data });
  } catch (error: any) {
    await logError(error, "getCampaign", req.body);
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

const validateForm = async (name: string) => {
  if (name.length < 3) return "Name must have 3 or more characters";

  return "";
};

// post : http://localhost:3000/api/campaign
export async function postCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });

    // get and validate body variables
    const { name, userId } = req.body;

    const errorMessage = await validateForm(name);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    // create new Campaign on MongoDB
    const newCampaign = new Campaign({
      name,
      master: userId,
      createdBy: userId,
      characters: [],
      closedAt: null,
    });

    const { _id } = await newCampaign.save();
    res.status(200).json({ id: _id.toString() });
  } catch (error: any) {
    await logError(error, "postCampaign", req.body);
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/campaign/1
export async function putCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { campaignId } = req.query;
    const formData = req.body;

    if (campaignId && formData) {
      const campaign = await Campaign.findByIdAndUpdate(campaignId, formData);
      res.status(200).json(campaign);
    }
    res.status(404).json({ error: "Campaign Not Selected...!" });
  } catch (error: any) {
    await logError(error, "putCampaign", req.body);
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/campaign/1
export async function deleteCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { campaignId } = req.query;

    if (campaignId)
      return res.status(404).json({ error: "Campaign Not Selected...!" });

    const campaign = await Campaign.findByIdAndDelete(campaignId);
    return res.status(200).json(campaign);
  } catch (error: any) {
    await logError(error, "deleteCampaign", req.body);
    res.status(404).json({ error: "Error While Deleting the Campaign...!" });
  }
}
