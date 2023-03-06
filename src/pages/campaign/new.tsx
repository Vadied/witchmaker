import { useState } from "react";

import { useStateContext } from "@/contexts/StateContext";

import Button from "@/components/button";
import Layout from "@/components/layout";

const NewRecord = () => {
  const { t } = useStateContext();
  const [record, setRecord] = useState({});

  const handleClick = () => {
    console.log("salva record ---->", record);
  };

  return (
    <Layout>
      <>
        <h2 className="title">
          <div>{t("campaign.new")}</div>
          <Button handleClick={handleClick}>{t("record.btn.save")}</Button>
        </h2>
        <div className="content">
            
        </div>
      </>
    </Layout>
  );
};

export default NewRecord;
