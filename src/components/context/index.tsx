import StateProvider from "@/contexts/StateContext";

type Props = {
  children: JSX.Element;
};
const Context = ({ children }: Props) => {
  return <StateProvider>{children}</StateProvider>;
};

export default Context;
