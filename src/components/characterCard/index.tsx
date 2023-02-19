import { ICharacter } from "@/models/character.model";

const CharacterCard = ({ name }: ICharacter) => {
  return <div>Character {name}</div>;
};

export default CharacterCard;
