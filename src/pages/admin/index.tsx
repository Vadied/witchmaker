import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { isAuthorized } from "@/utils/utils";

import { ADMIN } from "@/assets/constants/roles";
import { PAGE_AUTH } from "@/assets/constants/urls";

const Backoffice = () => {
  return <div>Backoffice</div>;
};

export default Backoffice;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  const available = isAuthorized(session?.user?.roles || [], [ADMIN]);
  if (!session || !available)
    return {
      props: {
        redirect: {
          destination: `${PAGE_AUTH}?callbackUrl=${process.env.CURRENT_URL}/admin`,
          permanent: false,
        },
      },
    };

  return {
    props: {
      session,
    },
  };
};
