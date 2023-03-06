import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import Campaign from "@/schemas/Campaign";

import { ResponseData } from "@/models/response.model";

import { validateEmail } from "@/utils/utils";

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
    const campaigns = await Campaign.find({ createdBy: userid });
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
      if (!campaign) throw new Error(`Campaign not founnd` );
  
      return campaign;
      console.log("Campaign not Selected...!")
  } catch (error) {
    console.log("Cannot get the Campaign...!", error)
    return null
  }
}

const validateForm = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (name.length < 3) return { error: "Name must have 3 or more characters" };

  if (!validateEmail(email)) return { error: "Email is invalid" };

  if (password.length < 5)
    return { error: "Password must have 5 or more characters" };

  if (password !== confirmPassword) return { error: "Passwords do not match" };

  const emailCampaign = await Campaign.findOne({ email: email });

  if (emailCampaign) return { error: "Email already exists" };

  return null;
};

// post : http://localhost:3000/api/campaigns
export async function postCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });

    // get and validate body variables
    const { name, surname, email, password, confirmPassword } = req.body;

    const errorMessage = await validateForm(
      name,
      email,
      password,
      confirmPassword
    );
    if (errorMessage) return res.status(400).json(errorMessage as ResponseData);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new Campaign on MongoDB
    Campaign.create(
      {
        name,
        surname,
        email,
        hashedPassword,
      },
      function (err: Error, data: any) {
        const { _id } = data;
        return res.status(200).json({
          msg: "Successfuly created new Campaign",
          data: {
            name,
            surname,
            email,
            image: "",
            id: _id,
          },
        });
      }
    );
  } catch (error) {
    return res.status(404).json({ error: error as Error });
  }
}

// put : http://localhost:3000/api/campaigns/1
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
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/campaigns/1
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
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Campaign...!" });
  }
}
