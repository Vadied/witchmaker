import style from "@/styles/components/Background.module.css";

type Props = {
  children: JSX.Element;
};
const Background = ({ children }: Props) => {
  return (
    <div
      className={style.background}
      style={{ backgroundImage: "url('/images/base_bg.svg')" }}
    >
      {children}
    </div>
  );
};

export default Background;
