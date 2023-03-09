import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import style from "@/styles/pages/Campaigns.module.css";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICampaign } from "@/models/campaign.model";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";
import Loader from "@/components/loader";

import {
  API_CAMPAIGN,
  PAGE_AUTH,
  PAGE_CAMPAIGNS,
  PAGE_NEW,
} from "@/assets/constants/urls";
import axios from "axios";
import { useSession } from "next-auth/react";

type Props = {
  campaigns: ICampaign[];
};
const CampaignList = ({ campaigns = [] }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();
  const { status } = useSession();

  const handleClick = () => {
    router.push(`/${PAGE_CAMPAIGNS}/${PAGE_NEW}`);
  };

  console.log("test ", campaigns);
  if (status === "loading") return <Loader />;

  return (
    <>
      <h2 className="title">
        <div>{t("campaign.list.title")}</div>
        <Button handleClick={handleClick}>{t("record.btn.new")}</Button>
      </h2>
      <div className={style.content}>
        {campaigns.map((c: ICampaign) => (
          <CampaignCard key={c._id} {...c} />
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

  const { data } = await axios.post(
    `${process.env.BASE_URL}/${API_CAMPAIGN}/getByUser`,
    { userId: session.user._id }
  );

  if (!data)
    return {
      props: { campaigns: [] },
    };

  return {
    props: { campaigns: data },
  };
};
