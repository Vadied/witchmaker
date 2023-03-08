import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";

import { ICampaign } from "@/models/campaign.model";
import { ICharacter } from "@/models/character.model";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import CharacterCard from "@/components/characterCard";
import Loader from "@/components/loader";

import { getCampaign } from "@/lib/campaigns";

import {
  API_CAMPAIGN,
  PAGE_AUTH,
  PAGE_CAMPAIGNS,
} from "@/assets/constants/urls";
import axios from "axios";

interface Props extends ICampaign {
  characters: ICharacter[];
}
const Campaign = ({ name, id, characters = [] }: Props) => {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

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

export default Campaign;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  const { campaignId } = query;
  if (!campaignId)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_CAMPAIGNS}`,
          permanent: false,
        },
      },
    };

  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CAMPAIGNS}/${campaignId}`,
          permanent: false,
        },
      },
    };

  const {data} = await axios.get(`${API_CAMPAIGN}/${campaignId}`);
  return { props: { ...data.campaign } };
};
