import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import "@/components/navbar/navbar.css";

import { CustomAppProps } from "@/models/component.model";

import Navbar from "@/components/navbar";
import Auth from "@/components/auth";
import Context from "@/components/context";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      <Context>
        <>
          <Navbar />
          <Auth auth={Component.auth || null}>
            <Component {...pageProps} />
          </Auth>
        </>
      </Context>
    </SessionProvider>
  );
};

export default App;
