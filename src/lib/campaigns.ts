import campaigns from "@/assets/mocks/campaings.json";
import characters from "@/assets/mocks/characters.json";

import { ICampaign } from "@/models/campaign.model";

export const getCampaignData = async (id: string) => {
  return campaigns.campaigns.find((c) => c.id === id) as ICampaign;
};

export const getAllCampaigns = async () => {
  return campaigns.campaigns.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
};

export const getAllCampaignsByUser = async (
  id: string
): Promise<ICampaign[]> => {
  const campaignIds = characters.characters
    .filter((c) => c.id === id)
    .map((c) => c.campaign);

  return campaigns.campaigns
    .filter((c) => c.master === id || campaignIds.includes(c.id))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};
