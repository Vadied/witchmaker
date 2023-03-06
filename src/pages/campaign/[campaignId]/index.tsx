import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";

import { ICampaign } from "@/models/campaign.model";
import { ICharacter } from "@/models/character.model";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import CharacterCard from "@/components/characterCard";

import { getCampaign } from "@/lib/campaigns";
import { getCharacterByCampaing } from "@/lib/characters";

import { PAGE_AUTH, PAGE_CAMPAIGNS } from "@/assets/constants/urls";

interface Props extends ICampaign {
  characters: ICharacter[];
}
const Campaign = ({ name, id, characters = [] }: Props) => {
  const router = useRouter();
  const {status} = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <>
      <h2>
        Campaign {name} {id}
      </h2>
      <div>
        {characters.map((c: ICharacter, i: number) => (
          <CharacterCard key={i} {...c} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  const { campaingId } = query;

  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CAMPAIGNS}/${campaingId}`,
          permanent: false,
        },
      },
    };

  const campaign = await getCampaign(campaingId as string);
  const characters = await getCharacterByCampaing(campaingId as string);
  return { props: { ...campaign, characters } };
};

export default Campaign;
