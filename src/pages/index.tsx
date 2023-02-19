import Head from "next/head";


import Context from "@/components/context";

import CampaignList from "./campaigns";

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>WitchMaker</title>
        <meta name="description" content="RPG character generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Context>
        <main className={styles.main}>
          <CampaignList />
        </main>
      </Context>
    </>
  );
}
