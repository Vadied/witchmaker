import { useRouter } from "next/router";

import { ICampaign } from "@/models/campaign.model";
import { IUser } from "@/models/user.model";

import Button from "../button";

import { PAGE_CAMPAIGNS } from "@/assets/constants/urls";

const CampaignCard = ({ _id, name, createdBy }: ICampaign) => {
  const router = useRouter();
  const navigateToCampaign = () => {
    router.push(`${PAGE_CAMPAIGNS}/${_id}`);
  };
  return (
    <div>
      <h3>Campaign {name}</h3>
      <div>User: {(createdBy as IUser).name}</div>
      <div>
        <Button handleClick={navigateToCampaign}>Show</Button>
      </div>
    </div>
  );
};

export default CampaignCard;
