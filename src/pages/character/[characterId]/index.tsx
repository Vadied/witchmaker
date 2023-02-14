import Link from "next/link";
import { useRouter } from "next/router";

const Character = () => {
  const router = useRouter();
  const { characterId } = router.query;
  return (
    <div>
      Character Name {characterId}
      <Link href={`/character/${characterId}/edit`}>Edit</Link>
    </div>
  );
};

export default Character;
