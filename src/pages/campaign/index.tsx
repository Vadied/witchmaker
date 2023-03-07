import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ICampaign } from "@/models/campaign.model";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import CampaignCard from "@/components/campaignCard";
import Loader from "@/components/loader";

import { getCampaignsByUser } from "@/lib/campaigns";

import { PAGE_AUTH, PAGE_CAMPAIGNS, PAGE_NEW } from "@/assets/constants/urls";

type Props = {
  campaigns: ICampaign[];
};
const CampaignList = ({ campaigns }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();

  const handleClick = () => {
    router.push(`/${PAGE_CAMPAIGNS}/${PAGE_NEW}`)
  };

  if (!campaigns) return <Loader />;

  return (
      <>
        <h2 className="title">
          <div>{t("campaign.list.title")}</div>
          <Button handleClick={handleClick}>
            {t("record.btn.new")}
          </Button>
        </h2>
        <div className="content">
          {campaigns.map((c: ICampaign) => (
            <Link key={c.id} href={`campaigns/${c.id}`} passHref>
              <CampaignCard {...c} />
            </Link>
          ))}
        </div>
      </>
  );
};

export default CampaignList;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

  const campaigns = await getCampaignsByUser(session?.user?._id);
  return {
    props: { campaigns },
  };
};
