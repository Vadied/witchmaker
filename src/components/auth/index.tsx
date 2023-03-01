import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { TAuth } from "@/models/component.model";

type Props = {
  auth: TAuth | null;
  children: JSX.Element;
};
const Auth = ({ auth, children }: Props) => {
  const router = useRouter();

  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") return <div>Loading...</div>;

  if (!auth?.roles?.length) return children;

  const userRoles = session.user?.roles || [];
  if (userRoles.every((r: string) => !auth?.roles?.includes(r)))
    router.push(auth.unauthorized || "/api/auth/signin");

  return children;
};

export default Auth;
