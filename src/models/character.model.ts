import { ICampaign } from "./campaign.model";
import { IClass } from "./class.model";
import { IUser } from "./user.model";

export interface ICharacter {
  id: string;
  name: string;
  level: number;
  classes: IClass[];
  campaign: ICampaign;
  createdBy: IUser;
  createdAt: string;
}
