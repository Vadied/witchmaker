import { ICampaign } from "@/models/campaign.model";
import campaigns from "@/assets/mocks/campaings.json";

export const getCampaignData = async (id: string) => {
  return campaigns.campaigns.find((c) => c.id === id) as ICampaign;
};

export const getAllCampaigns = async () => {
  return campaigns.campaigns.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
};
