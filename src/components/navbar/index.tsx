import { MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import style from "@/styles/components/Navbar.module.css";

import { isAdmin } from "@/utils/utils";

import {
  PAGE_CAMPAIGNS,
  PAGE_CHARACTERS,
  PAGE_AUTH,
  PAGE_ADMIN,
} from "@/assets/constants/urls";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const pagesWithoutNavbar = [`/${PAGE_AUTH}`];
  if (pagesWithoutNavbar.includes(router.pathname)) return null;

  const handleSignOut: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    await signOut();
    router.push(`/${PAGE_AUTH}`);
  };

  const admin = isAdmin(session?.user.roles || []);

  return (
    <div className={`${style.navbar}`}>
      <div className={`${style.logo} center-content`}>
        <Link href="/">WitchMaker</Link>
      </div>
      <div className={`${style.links}`}>
        <Link href={`/${PAGE_CAMPAIGNS}`}>Campaigns</Link>

        <Link href={`/${PAGE_CHARACTERS}`}>Characters</Link>

        {admin && <Link href={`/${PAGE_ADMIN}`}>BackOffice</Link>}

        <Link href={`/${PAGE_AUTH}`}>
          <div onClick={handleSignOut}>Sign Out</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
