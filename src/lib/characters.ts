import type { NextApiRequest, NextApiResponse } from "next";

import Character from "@/schemas/Character";

import { ResponseData } from "@/models/response.model";

// get : http://localhost:3000/api/characters
export async function getCharacters(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const characters = await Character.find({});

    if (!characters) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({
      data: characters.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// post : http://localhost:3000/api/characters/getByUser
export async function getCharactersByUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId } = req.body;
    const characters = await Character.find({ createdBy: userId });

    if (!characters) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({
      data: characters.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
// post : http://localhost:3000/api/characters/getByCampaign
export async function getCharactersByCampaign(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { campaignId } = req.body;
    const characters = await Character.find({ campaign: campaignId });

    if (!characters) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({
      data: characters.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// get : http://localhost:3000/api/characters/1
export async function getCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { charId } = req.query;

    if (charId) {
      const character = await Character.findById(charId);
      res.status(200).json(character);
    }
    res.status(404).json({ error: "Character not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Character...!" });
  }
}

// post : http://localhost:3000/api/characters
export async function postCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    Character.create(formData, function (err: Error, data: any) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error: error as Error });
  }
}

// put : http://localhost:3000/api/characters/1
export async function putCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { charId } = req.query;
    const formData = req.body;

    if (charId && formData) {
      const character = await Character.findByIdAndUpdate(charId, formData);
      res.status(200).json(character);
    }
    res.status(404).json({ error: "Character Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/characters/1
export async function deleteCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { charId } = req.query;

    if (!charId)
      return res.status(404).json({ error: "Character Not Selected...!" });

    const character = await Character.findByIdAndDelete(charId);
    return res.status(200).json(character);
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Character...!" });
  }
}
