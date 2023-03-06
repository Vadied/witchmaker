import { PAGE_USER } from "@/assets/constants/urls";
import styles from "@/styles/Backoffice.module.css";
import Link from "next/link";

type Props = {
  children: JSX.Element;
};
const Backoffice = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <aside>
        <div className="title">Opzioni</div>
        <div className="link">
          <Link href={`/${PAGE_USER}`}>Users</Link>
        </div>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Backoffice;
