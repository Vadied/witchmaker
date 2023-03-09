import styles from "@/styles/components/Page.module.css";

type Props = {
  children: JSX.Element;
};
const Page = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Page;
