import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import User from "@/schemas/User";

import { ResponseData } from "@/models/response.model";

import { validateEmail } from "@/utils/utils";

import { USER } from "@/assets/constants/roles";

export async function getUsers() {
  try {
    const users = await User.find({});
    if (!users) throw new Error("No users found");

    return users.map(({ _id, name, surname, email, roles }) => ({
      _id: _id.toString(),
      name,
      surname,
      email,
      roles,
    }));
  } catch (error) {
    console.log("Error While Fetching Data", error);
    return [];
  }
}

export async function getUser(userId: string) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("No user found");
    
    const { _id, name, surname, email, roles } = user;
    return {
      _id: _id.toString(),
      name,
      surname,
      email,
      roles,
    };
  } catch (error) {
    console.log("Error While Fetching Data", error);
    return null;
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

  const emailUser = await User.findOne({ email: email });

  if (emailUser) return { error: "Email already exists" };

  return null;
};

// post : http://localhost:3000/api/users
export async function postUser(
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

    // create new User on MongoDB
    User.create(
      {
        name,
        surname,
        email,
        hashedPassword,
        roles: [USER],
      },
      function (err: Error, data: any) {
        const { _id } = data;
        return res.status(200).json({
          msg: "Successfuly created new User",
          data: {
            name,
            surname,
            email,
            roles: [USER],
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

// put : http://localhost:3000/api/users/1
export async function putUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await User.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/users/1
export async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId } = req.query;

    if (userId) return res.status(404).json({ error: "User Not Selected...!" });

    const user = await User.findByIdAndDelete(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the User...!" });
  }
}
