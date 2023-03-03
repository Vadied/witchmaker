import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import {
  PAGE_AUTH,
  PAGE_CAMPAIGNS,
  PAGE_CHARACTERS,
} from "@/assets/constants/urls";
import { authOptions } from "./api/auth/[...nextauth]";

const Home = () => {
  return (
    <>
      <Head>
        <title>WitchMaker</title>
        <meta name="description" content="RPG character generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Link href={PAGE_CAMPAIGNS}>Campagne</Link>
          <Link href={PAGE_CHARACTERS}>Personaggi</Link>
        </div>
        <div>Home</div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);
  console.log("session --->", session)
  if (!session)
    return {
      redirect: {
        destination: `${PAGE_AUTH}/?callbackUrl=${process.env.CURRENT_URL}`,
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
};
