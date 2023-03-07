import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { IUser } from "@/models/user.model";

import { useStateContext } from "@/contexts/StateContext";

import Backoffice from "@/components/backoffice";
import Button from "@/components/button";

import { getUser } from "@/lib/users";
import { isAdmin } from "@/utils/utils";

import { PAGE_AUTH, PAGE_USERS } from "@/assets/constants/urls";

type Props = {
  user: IUser;
};
const UserEdit = ({ user }: Props) => {
  const router = useRouter();
  const { t } = useStateContext();
  const editRecord = (userId: string) => () =>
    router.push(`/${PAGE_USERS}/${userId}/edit`);

  return (
    <Backoffice>
      <>
        <h2 className="list title">
          <div>
            {user.name} {user.surname}
          </div>

          <Button handleClick={editRecord(user._id)}>
            {t("record.btn.edit")}
          </Button>
        </h2>
        <div className="content">
          <div>{user.name}</div>
          <div>{user.surname}</div>
          <div>{user.email}</div>
        </div>
      </>
    </Backoffice>
  );
};

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session: Session | null = await getServerSession(req, res, authOptions);
  const { userId } = query;
  if (!session || !isAdmin(session.user.roles))
    return {
      props: {
        redirect: {
          destination: `/${PAGE_AUTH}?callbackUrl=${process.env.BASE_URL}/${PAGE_USERS}/${userId}`,
          permanent: false,
        },
      },
    };
  const user = await getUser(userId as string);

  if (!user)
    return {
      props: {
        redirect: {
          destination: `/${PAGE_USERS}`,
          permanent: false,
        },
      },
    };

  return { props: { user } };
};
