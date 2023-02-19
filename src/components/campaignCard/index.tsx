import { ICampaign } from "@/models/campaign.model";

const CampaignCard = ({ name }: ICampaign) => {
  return <div>Campaign {name}</div>;
};

export default CampaignCard;
