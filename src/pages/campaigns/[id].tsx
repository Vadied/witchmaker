import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { ICampaign } from "@/models/campaign.model";
import { ICharacter } from "@/models/character.model";

import CharacterCard from "@/components/characterCard";

import { getCampaignData } from "@/lib/campaigns";
import { getCharacterByCampaign } from "@/lib/characters";

interface Props extends ICampaign {
  characters: ICharacter[];
}
const Campaign = ({ id, characters = [] }: Props) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <h2>Campaign Name {id}</h2>
      <div>
        {characters.map((c: ICharacter, i: number) => (
          <Link key={i} href={`character/${c.id}`} passHref>
            <CharacterCard {...c} />
          </Link>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ICampaign> = async ({
  query = {},
}) => {
  const { id } = query;
  const campaign = await getCampaignData(id as string);
  const characters = await getCharacterByCampaign(id as string);
  return { props: { ...campaign, characters } };
};

export default Campaign;
