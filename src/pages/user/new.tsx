import { useState } from "react";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import Layout from "@/components/layout";
import Backoffice from "@/components/backoffice";

const NewUser = () => {
  const { t } = useStateContext();
  const [record, setRecord] = useState({});

  const handleClick = () => {
    console.log("salva record ---->", record);
  };

  return (
    <Backoffice>
      <>
        <h2 className="title">
          <div>{t("user.new")}</div>
          <Button handleClick={handleClick}>{t("record.btn.save")}</Button>
        </h2>
        <div className="content">
            Contenuto
        </div>
      </>
    </Backoffice>
  );
};

export default NewUser;
