import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import Character from "@/schemas/Character";

import { ResponseData } from "@/models/response.model";

import { validateEmail } from "@/utils/utils";

// get : http://localhost:3000/api/characters
export async function getCharacters(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const Characters = await Character.find({});

    if (!Characters) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json({ data: Characters });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
export async function getCharacterByCampaing(userId: string) {
  try {
    const characters = await Character.find({ createdBy: userId });
    if (!characters) return [];

    return characters;
  } catch (error) {
    console.log({ error: "Error While Fetching Data" });
    return [];
  }
}

export async function getCharactersByUser(userid: string) {
  try {
    const characters = await Character.find({ campaign: userid });
    if (!characters) return [];

    return characters;
  } catch (error) {
    console.log({ error: "Error While Fetching Data" });
    return [];
  }
}

// get : http://localhost:3000/api/characters/1
export async function getCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { CharacterId } = req.query;

    if (CharacterId) {
      const character = await Character.findById(CharacterId);
      res.status(200).json(character);
    }
    res.status(404).json({ error: "Character not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Character...!" });
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

  const emailCharacter = await Character.findOne({ email: email });

  if (emailCharacter) return { error: "Email already exists" };

  return null;
};

// post : http://localhost:3000/api/characters
export async function postCharacter(
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

    // create new Character on MongoDB
    Character.create(
      {
        name,
        surname,
        email,
        hashedPassword,
      },
      function (err: Error, data: any) {
        const { _id } = data;
        return res.status(200).json({
          msg: "Successfuly created new Character",
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

// put : http://localhost:3000/api/characters/1
export async function putCharacter(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { CharacterId } = req.query;
    const formData = req.body;

    if (CharacterId && formData) {
      const character = await Character.findByIdAndUpdate(
        CharacterId,
        formData
      );
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
    const { CharacterId } = req.query;

    if (CharacterId)
      return res.status(404).json({ error: "Character Not Selected...!" });

    const character = await Character.findByIdAndDelete(CharacterId);
    return res.status(200).json(character);
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Character...!" });
  }
}
