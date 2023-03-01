import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  return (
    <nav className="header">
      <h1 className="logo">
        <Link href="/">WitchMaker</Link>
      </h1>
      <ul className={`main-nav ${loading ? "loading" : "loaded"}`}>
        {!session && (
          <li>
            <Link href="api/auth/signin">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </div>
            </Link>
          </li>
        )}

        {session && (
          <>
            <li>
              <Link href="/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link href="/characters">Characters</Link>
            </li>
            <li>
              <Link href="api/auth/signout">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign Out
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
