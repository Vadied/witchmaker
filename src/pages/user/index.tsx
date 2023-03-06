import { API_USERS, PAGE_USER } from "@/assets/constants/urls";
import Backoffice from "@/components/backoffice";
import Button from "@/components/button";
import { useStateContext } from "@/contexts/StateContext";
import { IUser } from "@/models/user.model";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  users: IUser[];
};
const Userlist = ({ users = [] }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();
  const newRecord = () => router.push(`/${PAGE_USER}/new`);
  const editRecord = (userId: string) => () =>
    router.push(`/${PAGE_USER}/${userId}/edit`);
  const deleteRecord = (userId: string) => async () => {
    try {
      await axios.delete(`${API_USERS}/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      router.push(`/${PAGE_USER}`);
    } catch (e) {
      console.log("Delete Error -", e);
    }
  };

  return (
    <Backoffice>
      <>
        <h2 className="list title">
          <div>{t("user.list.title")}</div>
          <Button handleClick={newRecord}>{t("record.btn.new")}</Button>
        </h2>
        <div className="content">
          <div className="header"></div>
          {users.map((u) => (
            <div key={u.id}>
              <div className="col">
                <Link href={`/${PAGE_USER}/${u.id}`} passHref>
                  {u.name} {u.surname}
                </Link>
              </div>
              <div className="col">{u.email}</div>
              <div className="col actions">
                <Button handleClick={editRecord(u.id)}>
                  {t("record.btn.edit")}
                </Button>
                <Button handleClick={deleteRecord(u.id)}>
                  {t("record.btn.delete")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </>
    </Backoffice>
  );
};

export default Userlist;
