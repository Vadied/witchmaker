import { useState, useRef, KeyboardEventHandler } from "react";
import { useRouter } from "next/router";
import { getProviders, signIn, useSession } from "next-auth/react";
import axios from "axios";

import style from "@/styles/pages/Auth.module.css";

import Divider from "@/components/divider";
import ProviderButtons from "@/components/providersButtons";
import Button from "@/components/button";

import { handleEnter } from "@/utils/utils";

import { API_USERS, PAGE_CAMPAIGNS, PAGE_AUTH } from "@/assets/constants/urls";
import Loader from "@/components/loader";

const Auth = ({ providers }: any) => {
  const router = useRouter();
  const { status } = useSession();

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [authType, setAutType] = useState("Login");
  if (status === "loading") return <Loader />;

  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const redirectToHome = () => {
    const { pathname } = router;
    if (pathname !== `/${PAGE_AUTH}`) return;

    router.push("/");
  };

  type currentValue = {
    value: string;
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      email: (emailRef?.current as currentValue).value,
      password: (passwordRef?.current as currentValue).value,
      redirect: false,
      callbackUrl: `/${PAGE_CAMPAIGNS}`,
    });

    res.error ? console.log("Login error -", res.error) : redirectToHome();
  };

  const registerUser = async () => {
    try {
      await axios.post(
        `/${API_USERS}`,
        {
          name: (nameRef?.current as currentValue).value,
          surname: (surnameRef?.current as currentValue).value,
          email: (emailRef?.current as currentValue).value,
          password: (passwordRef?.current as currentValue).value,
          confirmPassword: (confirmRef?.current as currentValue).value,
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
      console.log("Register Error -", e);
    }
  };

  const formSubmit = () => {
    authType === "Login" ? loginUser() : registerUser();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) =>
    handleEnter(e.key, formSubmit);

  const isRegistering = authType === "Register";

  return (
    <div className={`${style.container} center-content`}>
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
                <input
                  type="text"
                  ref={nameRef}
                  placeholder={"Name"}
                  onKeyUp={onKeyUp}
                />
              )}
              {isRegistering && (
                <input
                  type="text"
                  ref={surnameRef}
                  placeholder={"Surname"}
                  onKeyUp={onKeyUp}
                />
              )}
              <input
                type="email"
                ref={emailRef}
                placeholder={"Email"}
                onKeyUp={onKeyUp}
              />
              <input
                type="password"
                ref={passwordRef}
                placeholder={"Password"}
                onKeyUp={onKeyUp}
              />
              {isRegistering && (
                <input
                  type="password"
                  ref={confirmRef}
                  placeholder={"Confirm password"}
                  onKeyUp={onKeyUp}
                />
              )}
              <Button type={"primary"} handleClick={formSubmit}>
                {authType}
              </Button>
            </div>
          </form>
        </div>
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
