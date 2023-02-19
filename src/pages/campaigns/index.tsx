import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useContext } from "react";
import { useRouter } from "next/router";

import { ICampaign } from "@/models/campaign.model";

import { StateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      campaigns: data.slice(0, 3),
    },
  };
};

const CampaignList = ({
  campaigns,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useContext(StateContext);

  const handleClick = () => {
    router.push("/campaign");
  };

  return (
    <>
      <h2 className="title">
        <div>{t("campaign.list.title")}</div>
        <Button handleClick={handleClick}>{t("campaign.btn.new.label")}</Button>
      </h2>
      <div className="content">
        {campaigns.map((c: ICampaign) => (
          <Link href={`campaigns/${c.id}`} passHref>
            <CampaignCard {...c} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CampaignList;
