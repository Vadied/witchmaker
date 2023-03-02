import style from "./style.module.css";

export type Props = {
  type: string;
  id?: string;
  enabled?: boolean;
  isLink?: boolean;
  customClasses?: string;
  handleClick(): void;
  children: JSX.Element | string;
};
const Button = ({
  type = "",
  id = "",
  enabled = true,
  customClasses = "",
  handleClick,
  children,
}: Props) => {
  const enabledClass = (enabled && "cursor-pointer") || "";

  const onClick = () => {
    if (!enabled) return;

    handleClick();
  };

  console.log(style[type])

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
