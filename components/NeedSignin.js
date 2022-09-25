import { useRouter } from "next/router";
import FullPageLoader from "./FullPageLoader";

export default function NeedSignin() {
  const router = useRouter()
  router.push("/signin")
  return <FullPageLoader />
}