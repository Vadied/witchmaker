import Link from "next/link";

import styles from "@/styles/components/Backoffice.module.css";

import { PAGE_USERS } from "@/assets/constants/urls";

type Props = {
  children: JSX.Element;
};
const Backoffice = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <aside>
        <div className="title">Opzioni</div>
        <div className="link">
          <Link href={`/${PAGE_USERS}`}>Users</Link>
        </div>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Backoffice;
