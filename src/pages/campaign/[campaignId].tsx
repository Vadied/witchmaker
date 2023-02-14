import { useRouter } from "next/router";
import Link from "next/link";

const Campaign = () => {
  const router = useRouter();
  const { campaignId } = router.query;
  return (
    <div>
      Campaign Name {campaignId}
      <Link href="/character/1">character 1</Link>
      <Link href="/character/2">character 1</Link>
      <Link href="/character/3">character 1</Link>
    </div>
  );
};

export default Campaign;
