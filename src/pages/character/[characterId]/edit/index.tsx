import { useRouter } from "next/router";

const Character = () => {
  const router = useRouter();
  const { characterId } = router.query;
  return <div>Edit Character Name {characterId}</div>;
};

export default Character;
