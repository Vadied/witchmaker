import { NextComponentType } from "next";
import { AppProps } from "next/app";

export type TAuth = {
  roles?: string[];
  unauthorized?: string;
};

export type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: TAuth };
};
