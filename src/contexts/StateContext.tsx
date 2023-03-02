import { createContext, useContext } from "react";

import { IState } from "@/models/state.model";

import useTranslation from "@/hooks/useTranslation";

import { language } from "@/assets/constants";

const StateContext = createContext({} as IState);

type Props = {
  children: JSX.Element;
};
const StateProvider = ({ children }: Props) => {
  const { t } = useTranslation();

  const context = {
    language,
    t,
  };

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export default StateProvider;

export const useStateContext = () => {
  return useContext(StateContext)
}
