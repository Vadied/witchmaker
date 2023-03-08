import type { NextApiRequest, NextApiResponse } from "next";

import Campaign from "@/schemas/Campaign";

import { ResponseData } from "@/models/response.model";

import { ICampaign } from "@/models/campaign.model";

// get : http://localhost:3000/api/campaigns
export async function getCampaigns(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const campaigns = await Campaign.find({});

    if (!campaigns) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({ data: campaigns });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// get : http://localhost:3000/api/campaigns
export async function getCampaignsByUser(userid: string) {
  try {
    console.log("getCampaignsByUser")
    const campaigns = await Campaign.find({ createdBy: userid });
    
    console.log("campaigns", campaigns)
    if (!campaigns) return [];

    return campaigns;
  } catch (error) {
    console.log({ error: "Error While Fetching Data" });
    return [];
  }
}

export async function getCampaign(campaignId: string) {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) throw new Error(`Campaign not found`);

    return campaign;
  } catch (error) {
    console.log("Cannot get the Campaign...!", error);
    return null;
  }
}

const validateForm = (formData: ICampaign) => {
  if (!formData.name) return "Name is required";

  if (formData.name.length < 3) return "Name must have 3 or more characters";

  return "";
};

export async function postCampaign(formData: ICampaign, userId: string) {
  try {
    console.log("postCampaign", formData)
    if (!formData) throw new Error("Form Data Not Provided...!");

    const errorMessage = validateForm(formData);
    if (errorMessage) throw new Error(errorMessage);

    // create new Campaign on MongoDB
    const test = {
      ...formData,
      master: userId,
      createdBy: userId,
      characters: [],
      closedAt: null,
    };
    const newCampaign = new Campaign(test);

    console.log("type --->", newCampaign instanceof Campaign);
    console.log("nuova campagna --->", newCampaign);
    const saved = await newCampaign.save();
    // const saved = await Campaign.create(test);
    console.log("creata campagna --->", saved);
    return saved._id.toString();
  } catch (error) {
    console.log("Error saving record -", error);
    return null;
  }
}

// put : http://localhost:3000/api/campaigns/1
// export async function putCampaign(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   try {
//     const { campaignId } = req.query;
//     const formData = req.body;

//     if (campaignId && formData) {
//       const campaign = await Campaign.findByIdAndUpdate(campaignId, formData);
//       res.status(200).json({messages: "campaign"});
//     }
//     res.status(404).json({ error: "Campaign Not Selected...!" });
//   } catch (error) {
//     res.status(404).json({ error: "Error While Updating the Data...!" });
//   }
// }

// // delete : http://localhost:3000/api/campaigns/1
// export async function deleteCampaign(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   try {
//     const { campaignId } = req.query;

//     if (campaignId)
//       return res.status(404).json({ error: "Campaign Not Selected...!" });

//     const campaign = await Campaign.findByIdAndDelete(campaignId);
//     return res.status(200).json("campaign");
//   } catch (error) {
//     res.status(404).json({ error: "Error While Deleting the Campaign...!" });
//   }
// }
