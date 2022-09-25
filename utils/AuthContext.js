import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import FullPageLoader from "@components/FullPageLoader";
import NeedSignin from "@components/NeedSignin";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter()
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  
  const protectedRoute = ["admin"]
  const path = router.pathname.split("/").slice(1, 2)
  if (path[0] == "") {
    path[0] = "/"
  }

  const privateRoute = protectedRoute.includes(path[0])

  const { data: session, status} = useSession();

  useEffect(() => {
    if (session != null) {
      localStorage.setItem("user-id", session.id)
      localStorage.setItem("user-name", session.name)
      localStorage.setItem("user-email", session.email)
      setUserId(localStorage.getItem("user-id"))
      setUserName(localStorage.getItem("user-name"))
      setUserEmail(localStorage.getItem("user-email"))
    }
  }, [session]);

  if (status === "loading" && privateRoute) {
    return <FullPageLoader />
  }

  // pass to another component because if push directly to /signin page, 
  // content being flashed for a few second
  if (status === "unauthenticated" && privateRoute) {
    return <NeedSignin />
  }

  return (
    <AuthContext.Provider value={{ userId, userName, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};