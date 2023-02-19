type Props = {
  handleClick(): void;
  children: JSX.Element | string;
};
const Button = ({ handleClick, children }: Props) => {
  return <div onClick={handleClick}>{children}</div>;
};

export default Button;
