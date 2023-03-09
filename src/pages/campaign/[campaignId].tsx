import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import style from "@/styles/pages/Record.module.css";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICampaign } from "@/models/campaign.model";
import { ICharacter } from "@/models/character.model";
import { IUser } from "@/models/user.model";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CharacterCard from "@/components/characterCard";
import Loader from "@/components/loader";
import Page from "@/components/page";

import {
  API_CAMPAIGN,
  PAGE_AUTH,
  PAGE_CAMPAIGNS,
} from "@/assets/constants/urls";

interface Props extends ICampaign {
  characters: ICharacter[];
}
const Campaign = ({ _id, name, characters = [], createdBy }: Props) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useStateContext();

  if (status === "loading") return <Loader />;

  const deleteRecord = async () => {
    await axios.delete(`${API_CAMPAIGN}/${_id}`);
    router.push(`${PAGE_CAMPAIGNS}`);
  };

  return (
    <Page>
      <>
        <h2 className={style.title}>
          <div>
            {t("campaign.details.title")} {name}
          </div>
          <div className={style.actions}>
            <Button type="secondary" handleClick={deleteRecord}>Delete</Button>
            <Button>Edit</Button>
          </div>
        </h2>
        <h3>Master {(createdBy as IUser).name}</h3>
        <div>
          {characters.map((c: ICharacter, i: number) => (
            <CharacterCard key={i} {...c} />
          ))}
        </div>
      </>
    </Page>
  );
};

export default Campaign;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CAMPAIGNS}`,
          permanent: false,
        },
      },
    };

  const { campaignId } = query;
  const { data } = await axios.get(
    `${process.env.BASE_URL}/${API_CAMPAIGN}/${campaignId}`
  );
  console.log(data);
  return { props: { ...data } };
};
