import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import { ICampaign } from "@/models/campaign.model";
import { ICharacter } from "@/models/character.model";

import CharacterCard from "@/components/characterCard";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { campaignId } = params || {};
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${campaignId}}`
  );
  const data: ICampaign = await response.json();

  return { props: { ...data } };
};

const Campaign = ({
  id,
  characters = [],
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h2>Campaign Name {id}</h2>
      <div>
        {characters.map((c: ICharacter) => (
          <Link href={`character/${c.id}`} passHref>
            <CharacterCard {...c} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Campaign;
