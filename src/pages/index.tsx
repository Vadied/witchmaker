import Head from "next/head";
import Link from "next/link";

import { PAGE_CAMPAIGNS, PAGE_CHARACTERS } from "@/assets/constants/urls";

export default function Home() {
  return (
    <>
      <Head>
        <title>WitchMaker</title>
        <meta name="description" content="RPG character generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main >
          <div>
            <Link href={PAGE_CAMPAIGNS}>Campagne</Link>
            <Link href={PAGE_CHARACTERS}>Personaggi</Link>
          </div>
          <div>Home</div>
        </main>
    </>
  );
}
