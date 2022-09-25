import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import FullPageLoader from "@components/FullPageLoader";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const { status, data: session } = useSession();
  const router = useRouter()
  const protectedRoute = ["admin"]
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

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

  /**
   * split route by "/". ex : "dashboard/pages" to ["dashboard", "pages"] 
   * then take only first item ["dashboard"] 
   * if in index page, set to "/"
   */
  const path = router.pathname.split("/").slice(1, 2)
  if (path[0] == "") {
    path[0] = "/"
  }

  /**
   * if current route in protectedRoute and user not authenticated,
   * show SignIn Page
   */

  // Push to SignIn Page if user not authenticated
  if (protectedRoute.includes(path[0]) && status === "loading") {
    return <FullPageLoader />
  }
  if (protectedRoute.includes(path[0]) && status === "unauthenticated") {
    router.push("/signin")
  }

  return (
    <AuthContext.Provider value={{ userId, setUserId, userName, setUserName, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};