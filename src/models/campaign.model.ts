import { IUser } from "./user.model";

export interface ICampaign {
  id: string;
  name: string;
  createdAt: string;
  closedAt: string;
  master: IUser | string;
}
