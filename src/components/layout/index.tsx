import styles from "@/styles/components/Layout.module.css";

import Background from "@/components/background";
import Navbar from "@/components/navbar";

type Props = {
  children: JSX.Element;
};
const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Background>{children}</Background>
    </div>
  );
};

export default Layout;
