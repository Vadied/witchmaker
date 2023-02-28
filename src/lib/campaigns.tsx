import { ICampaign } from "@/models/campaign.model";
import campaigns from "@/assets/mocks/campaings.json";

export const getAllCampaigns = async () => {
  const data: ICampaign[] = campaigns.campaigns;
  // Sort campaigns by date
  return data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};

export async function getCampaignData(id: string) {
  return campaigns.campaigns.find((c) => c.id === id) as ICampaign;
}
