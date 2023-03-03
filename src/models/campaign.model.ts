import { IUser } from "./user.model";

export interface ICampaign {
  id: string;
  name: string;
  closedAt: string;
  master: IUser | string;
  createdAt: string;
}
