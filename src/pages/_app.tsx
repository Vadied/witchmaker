import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import Context from "@/components/context";
import Layout from "@/components/layout";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Context>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </Context>
    </SessionProvider>
  );
};

export default App;
