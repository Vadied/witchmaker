import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICharacter } from "@/models/character.model";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CharacterCard from "@/components/characterCard";
import Loader from "@/components/loader";

import { getCharactersByUser } from "@/lib/characters";

import { PAGE_AUTH, PAGE_CAMPAIGNS, PAGE_CHARACTERS, PAGE_NEW } from "@/assets/constants/urls";

type Props = {
  characters: ICharacter[];
};
const CharacterList = ({ characters }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();

  const handleClick = () => {
    router.push(`/${PAGE_CAMPAIGNS}/${PAGE_NEW}`)
  };

  if (!characters) return <Loader />;

  return (
      <>
        <h2 className="title">
          <div>{t("character.list.title")}</div>
          <Button handleClick={handleClick}>
            {t("record.btn.new")}
          </Button>
        </h2>
        <div className="content">
          {characters.map((c: ICharacter) => (
            <Link key={c.id} href={`characters/${c.id}`} passHref>
              <CharacterCard {...c} />
            </Link>
          ))}
        </div>
      </>
  );
};

export default CharacterList;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CHARACTERS}`,
          permanent: false,
        },
      },
    };

  const characters = await getCharactersByUser(session?.user?._id);
  return {
    props: { characters },
  };
};
