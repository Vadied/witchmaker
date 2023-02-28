import { GetServerSideProps } from "next";
import { useContext } from "react";
import Link from "next/link";

import { ICampaign } from "@/models/campaign.model";

import { StateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";

import { getAllCampaigns } from "@/lib/campaigns";

type Props = {
  campaigns: ICampaign[];
};
const CampaignList = ({ campaigns }: Props) => {
  console.log("CampaignList rendered:", campaigns);
  // const router = useRouter();
  const { t } = useContext(StateContext);
  console.log("test --->", t);
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // TODO: Fetch all campaigns from API or database
  const campaigns = await getAllCampaigns();
  return { props: { campaigns } };
};

export default CampaignList;
