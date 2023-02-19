import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useContext } from "react";
import { useRouter } from "next/router";

import { ICampaign } from "@/models/campaign.model";

import { StateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log("hei there!!!!!!!!!!!!!!!!!!!!!!!!");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log("test", data);
    return {
      props: {
        campaigns: data.slice(0, 3),
      },
    };
  } catch (error) {
    console.log("Error recovering campaign -", error);

    return {
      props: {
        campaigns: [],
      },
    };
  }
};

const CampaignList = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  console.log("CampaignList rendered with props:", props);
  // const router = useRouter();
  const { t } = useContext(StateContext);

  const handleClick = () => {
    // router.push("/campaign");
    console.log("create new Campaign");
  };

  return (
    <>
      <h2 className="title">
        <div>{t("campaign.list.title")}</div>
        <Button handleClick={handleClick}>{t("campaign.btn.new.label")}</Button>
      </h2>
      <div className="content">
        {/* {props.campaigns.map((c: ICampaign) => (
          <Link href={`campaigns/${c.id}`} passHref>
            <CampaignCard {...c} />
          </Link>
        ))} */}
      </div>
    </>
  );
};

export default CampaignList;
