import fs from "fs";
import path from "path";

import { ICampaign } from "@/models/campaign.model";

const directory = path.join(process.cwd(), "campaigns");

export const getSortedCampaignsData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log("getSortedCampaignsData --->", data);
  // Sort campaigns by date
  return (data as ICampaign[]).sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
};

export async function getCampaignData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}}`
  );
  return response.json();
}
