import { GlobalProvider } from "@utils/GlobalContext";
import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import { SessionProvider, useSession } from "next-auth/react";
import { AuthProvider } from "@utils/AuthContext";
import "@styles/globals.css";
import "@styles/prism.css";
import FullPageLoader from "@components/FullPageLoader";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <AuthProvider>
          <AxiosConfigProvider>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </AxiosConfigProvider>
        </AuthProvider>
      </SessionProvider>
    </GlobalProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (status === "loading") return <FullPageLoader />
  return children
}

export default MyApp
