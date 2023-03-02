import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import style from "./style.module.css";

import {
  PAGE_CAMPAIGNS,
  PAGE_CHARACTERS,
  PAGE_AUTH,
} from "@/assets/constants/urls";

const Navbar = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  console.log(status, session);

  const pagesWithoutNavbar = [PAGE_AUTH];

  if (pagesWithoutNavbar.includes(pathname)) return null;

  return (
    <div className={`${style.navbar}`}>
      <div className={`${style.logo} center-content`}>
        <Link href="/">WitchMaker</Link>
      </div>
      <div className={`${style.links}`}>
        {!session && (
          <Link href={PAGE_AUTH}>
            <div
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </div>
          </Link>
        )}

        {session && (
          <>
            <Link href={PAGE_CAMPAIGNS}>Campaigns</Link>

            <Link href={PAGE_CHARACTERS}>Characters</Link>

            <Link href={PAGE_AUTH}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
