import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import styles from "@/styles//Admin.module.css";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import Backoffice from "@/components/backoffice";

import { isAdmin } from "@/utils/utils";

import { PAGE_AUTH } from "@/assets/constants/urls";

const Admin = () => {
  return (
    <Backoffice>
      <div className={styles.container}>Admin</div>
    </Backoffice>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  const authorized = isAdmin(session?.user?.roles || []);
  if (!session || !authorized)
    return {
      props: {
        redirect: {
          destination: `${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/admin`,
          permanent: false,
        },
      },
    };

  return {
    props: {},
  };
};
