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
import Loader from "@/components/loader";

import { getAllCampaignsByUser } from "@/lib/campaigns";

import { isAuthorized } from "@/utils/utils";

import { USER } from "@/assets/constants/roles";
import { PAGE_AUTH } from "@/assets/constants/urls";

type Props = {
  campaigns: ICampaign[];
};
const CampaignList = ({ campaigns }: Props) => {
  const { t } = useStateContext();
  const { data: session, status } = useSession();

  console.log("session --->", session?.user);
  console.log("status --->", status);

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

  console.log("session --->", session);
  if (!session || !isAuthorized(session?.user?.roles || [], [USER]))
    return {
      props: {
        redirect: {
          destination: `${PAGE_AUTH}?callbackUrl=${process.env.CURRENT_URL}/campaigns`,
          permanent: false,
        },
      },
    };

  const campaigns = await getAllCampaignsByUser(session?.user?.id);
  console.log("campaigns --->", campaigns);
  return {
    props: {
      session,
      campaigns,
    },
  };
};
