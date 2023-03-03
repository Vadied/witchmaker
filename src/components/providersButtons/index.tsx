import { signIn } from "next-auth/react";
import style from "./style.module.css";

import Button from "../button";

const ProviderButtons = ({ providers }: any) => (
  <div className={`${style.container} center-content column`}>
    {Object.values(providers).map(
      (p: any) =>
        p.name !== "Credentials" && (
          <Button
            key={p.name}
            type="submit"
            handleClick={() => {
              signIn(p.id, { callbackUrl: `${process.env.CURRENT_URL}/` });
            }}
          >
            <>Sign in with {p.name}</>
          </Button>
        )
    )}
  </div>
);

export default ProviderButtons;