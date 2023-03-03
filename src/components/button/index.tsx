import style from "./style.module.css";

export type Props = {
  type?: string;
  id?: string;
  enabled?: boolean;
  isLink?: boolean;
  customClasses?: string;
  handleClick?(): void;
  children: JSX.Element | string;
};
const Button = ({
  type = "primary",
  id = "",
  enabled = true,
  customClasses = "",
  handleClick,
  children,
}: Props) => {
  const enabledClass = (enabled && "cursor-pointer") || "";

  const onClick = () => {
    if (!enabled || !handleClick) return;

    handleClick();
  };

  return (
    <div
      id={id}
      className={`${style.button} ${style[type]} ${enabledClass} ${customClasses}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
