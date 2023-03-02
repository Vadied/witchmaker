import style from "./style.module.css";

type Props = {
  word?: string;
};
const Divider = ({ word }: Props) => {
  return (
    <>
      {word ? (
        <div className={`${style.divider} center-content`}>
          <div className={`${style.line}`}></div>
          <div>{word}</div>
          <div className={`${style.line}`}></div>
        </div>
      ) : (
        <div className={`${style.line}`}></div>
      )}
    </>
  );
};

export default Divider;
