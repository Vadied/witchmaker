import { ICharacter } from "@/models/character.model";
import data from "@/assets/mocks/characters.json";

// const directory = path.join(process.cwd(), "characters");

export const getAllCharacters = async () => {
  const characters: ICharacter[] = data.characters;
  // Sort characters by date
  return characters.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};

export const getCharacterByCampaign = async (id: string) => {
  const characters: ICharacter[] = data.characters;
  // Sort characters by date
  return characters
    .filter((c) => c.campaign === id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};

export async function getCharacterData(id: string) {
  return data.characters.find((c) => c.id === id) as ICharacter;
}
