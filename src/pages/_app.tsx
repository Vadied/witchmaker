import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import Navbar from "@/components/navbar";
import Context from "@/components/context";
import Background from "@/components/background";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Context>
        <>
          <Navbar />
          <Background>
            <Component {...pageProps} />
          </Background>
        </>
      </Context>
    </SessionProvider>
  );
};

export default App;
