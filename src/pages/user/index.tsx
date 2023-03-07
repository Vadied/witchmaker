import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import axios from "axios";

import style from "@/styles/pages/Record.module.css"

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { IUser } from "@/models/user.model";

import { useStateContext } from "@/contexts/StateContext";

import Backoffice from "@/components/backoffice";
import Button from "@/components/button";

import { getUsers } from "@/lib/users";
import { isAdmin } from "@/utils/utils";

import { API_USERS, PAGE_AUTH, PAGE_USERS } from "@/assets/constants/urls";

type Props = {
  users: IUser[];
};
const Userlist = ({ users = [] }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();
  const newRecord = () => router.push(`/${PAGE_USERS}/new`);
  const editRecord = (userId: string) => () =>
    router.push(`/${PAGE_USERS}/${userId}/edit`);
  const deleteRecord = (userId: string) => async () => {
    try {
      await axios.delete(`${API_USERS}/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      router.push(`/${PAGE_USERS}`);
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
        <div className={style.content}>
          <div className={`${style.row} ${style.header}`}>
            <div className={style.col}>{t("user.label.name")}</div>
            <div className={style.col}>{t("user.label.email")}</div>
            <div className={style.col}>{t("user.label.roles")}</div>
            <div className={style.col}>{t("record.actions")}</div>
          </div>
          {users.map((u) => (
            <div key={u._id} className={`${style.row}`}>
              <div className={style.col}>
                <Link href={`/${PAGE_USERS}/${u._id}`} passHref>
                  {u.name} {u.surname}
                </Link>
              </div>
              <div className={style.col}>{u.email}</div>
              <div className={style.col}>{u.roles.join(" ")}</div>
              <div className={`${style.col} ${style.actions}`}>
                <Button handleClick={editRecord(u._id)}>
                  {t("record.btn.edit")}
                </Button>
                <Button handleClick={deleteRecord(u._id)}>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session || !isAdmin(session.user.roles))
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_USERS}`,
          permanent: false,
        },
      },
    };

  const users = await getUsers();
  return { props: { users: [...users] } };
};
