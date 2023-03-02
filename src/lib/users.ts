import data from "@/assets/mocks/users.json";

export const findUserByEmail = (email: string) => {
  return data.users.find((u) => u.email === email) || null;
};
