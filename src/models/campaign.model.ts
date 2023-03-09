import { IUser } from "./user.model";

export interface ICampaign {
  _id: string;
  name: string;
  closedAt: string;
  master: IUser | string;
  createdBy: IUser | string;
  createdAt: string;
}
