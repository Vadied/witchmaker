import { useState } from "react";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import Backoffice from "@/components/backoffice";
import { currentValue } from "@/models/params.model";

const NewUser = () => {
  const { t } = useStateContext();
  const [record, setRecord] = useState({});

  const updateRecord = (field: string) => (e: HTMLInputElement) =>
    setRecord({ ...record, [field]: e?.target?.value || "" });

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
          <input onChange={updateRecord("name")} />
          <input onChange={updateRecord("surname")} />
          <input onChange={updateRecord("email")} />
        </div>
      </>
    </Backoffice>
  );
};

export default NewUser;
