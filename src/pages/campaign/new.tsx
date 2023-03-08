import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";
import axios from "axios";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICampaign } from "@/models/campaign.model";

import { useStateContext } from "@/contexts/StateContext";

import Loader from "@/components/loader";
import Button from "@/components/button";

import {
  API_CAMPAIGN,
  PAGE_AUTH,
  PAGE_CAMPAIGNS,
} from "@/assets/constants/urls";

type Props = {
  userId: string;
};
const NewCampaign = ({ userId }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const { t } = useStateContext();
  const [record, setRecord] = useState<ICampaign>({} as ICampaign);

  if (status === "loading") return <Loader />;

  const updateRecord = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setRecord((r) => ({ ...r, [field]: e?.target?.value || "" }));

  const handleClick = async () => {
    const { data } = await axios.post(`/${API_CAMPAIGN}`, {
      ...record,
      userId,
    });
    if (!data.id) return;

    router.push(`/${PAGE_CAMPAIGNS}/${data.id}`);
  };

  return (
    <>
      <h2 className="title">
        <div>{t("campaign.new")}</div>
        <Button handleClick={handleClick}>{t("record.btn.save")}</Button>
      </h2>
      <div className="content">
        <label htmlFor="name">{t("campaign.label.name")}</label>
        <input id="name" onChange={updateRecord("name")} />
      </div>
    </>
  );
};

export default NewCampaign;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);
  if (!session)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_CAMPAIGNS}/new`,
          permanent: false,
        },
      },
    };

  return { props: { userId: session?.user?._id } };
};
