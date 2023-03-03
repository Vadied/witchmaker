import { GetServerSideProps } from "next";
import Link from "next/link";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICampaign } from "@/models/campaign.model";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";

import { getAllCampaignsByUser } from "@/lib/campaigns";

import { PAGE_AUTH, PAGE_CAMPAIGNS } from "@/assets/constants/urls";

type Props = {
  campaigns: ICampaign[];
};
const CampaignList = ({ campaigns }: Props) => {
  const { t } = useStateContext();

  const handleClick = () => {
    console.log("create new Campaign");
  };

  return (
    <>
      <h2 className="title">
        <div>{t("campaign.list.title")}</div>
        <Button handleClick={handleClick}>{t("campaign.btn.new.label")}</Button>
      </h2>
      <div className="content">
        {campaigns.map((c: ICampaign) => (
          <Link key={c.id} href={`campaigns/${c.id}`} passHref>
            <CampaignCard {...c} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CampaignList;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CAMPAIGNS}`,
          permanent: false,
        },
      },
    };

  const campaigns = await getAllCampaignsByUser(session?.user?.id);
  return {
    props: {
      session,
      campaigns,
    },
  };
};
