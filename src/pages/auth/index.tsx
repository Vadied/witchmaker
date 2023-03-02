import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";

import style from "@/styles/Auth.module.css";

import Divider from "@/components/divider";
import ProviderButtons from "@/components/providersButtons";

import {
  API_REGISTER,
  PAGE_CAMPAIGNS,
  PAGE_HOME,
  PAGE_AUTH,
} from "@/assets/constants/urls";
import axios from "axios";
import Button from "@/components/button";

const Auth = ({ providers }: any) => {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [authType, setAutType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const redirectToHome = () => {
    const { pathname } = router;
    if (pathname === PAGE_AUTH) router.push(PAGE_HOME);
  };

  type currentValue = {
    value: string;
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      email: emailRef?.current || ({} as currentValue).value,
      password: passwordRef?.current || ({} as currentValue).value,
      redirect: false,
      callbackUrl: PAGE_CAMPAIGNS,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const registerUser = async () => {
    try {
      const res = await axios.post(
        API_REGISTER,
        {
          name: nameRef?.current || ({} as currentValue).value,
          surname: surnameRef?.current || ({} as currentValue).value,
          email: emailRef?.current || ({} as currentValue).value,
          password: passwordRef?.current || ({} as currentValue).value,
          confirmPassword: confirmRef?.current || ({} as currentValue).value,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      await loginUser();
      redirectToHome();
    } catch (e) {
      console.log(e);
    }
  };

  const formSubmit = () => {
    authType === "Login" ? loginUser() : registerUser();
  };

  const isRegistering = authType === "Register";

  return (
    <div className={`${style.auth}`}>
      <div className={`${style.toggle} center-content column`}>
        <h1>{authType}</h1>
        <h3>
          {isRegistering ? "Already have an account?" : "Not registerd yet?"}
          <Button
            type="link"
            handleClick={() => setAutType(oppAuthType[authType])}
          >
            {oppAuthType[authType]}
          </Button>
        </h3>

        <Divider />

        <ProviderButtons providers={providers} />

        <Divider word={"Or"} />

        <form onSubmit={formSubmit}>
          <div className={`${style.form} center-content column`}>
            {isRegistering && (
              <input type="text" ref={nameRef} placeholder={"Name"} />
            )}
            {isRegistering && (
              <input type="text" ref={surnameRef} placeholder={"Surname"} />
            )}
            <input type="email" ref={emailRef} placeholder={"Email"} />
            <input type="password" ref={passwordRef} placeholder={"Password"} />
            {isRegistering && (
              <input
                type="password"
                ref={confirmRef}
                placeholder={"Confirm password"}
              />
            )}
            <button type="submit">{authType}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
