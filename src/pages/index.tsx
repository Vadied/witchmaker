import Head from "next/head";

import Context from "@/components/context";

import styles from "@/styles/Home.module.css";
import Link from "next/link";

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
          <div>
            <Link href="campaigns">Campagne</Link>
            <Link href="characters">Personaggi</Link>
          </div>
          <div>Home</div>
        </main>
      </Context>
    </>
  );
}
