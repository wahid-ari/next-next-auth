import Head from 'next/head'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import Layout from '@components/Layout';
import Code from '@components/Code';

export default function Index() {

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Layout>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen">

          <section className="text-gray-600 body-font py-8">
            <h1 className="text-center font-medium text-3xl dark:text-white">Example how to Auth in NextJS using Next-Auth</h1>
            <h1 className="text-center font-medium text-xl dark:text-white mt-2">Next-Auth support Tab Syncing</h1>
            <h1 className="text-center font-medium text-xl dark:text-white mb-8 mt-2">Check Auth on every single page, or using Auth Component, or AuthContext</h1>
            <div className="flex justify-center md:mx-16">
              <ul className="dark:text-white space-y-1.5 list-disc mx-4">
                <li>
                  <a href="#protected" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Protected </b>
                  </a>
                  using <b>useSession</b>, this page did the auth checking directly on the page, showing <b>PageLoader</b> when status is loading and redirected to login page if status unauthenticated.
                </li>
                <li>
                  <a href="#secret" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Secret </b>
                  </a>
                  using <b>Secret.auth = true</b> inside page and <b>Auth</b> component inside
                  <a href="#app" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>_app.js</b>
                  </a>,
                  showing <b>PageLoader</b> when status is loading and redirected to login page if status unauthenticated.
                </li>
                <li>
                  <a href="#server" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Server </b>
                  </a>
                  using <b>getServerSideProps</b>, automatically redirected to login page before content being render.
                </li>
                <li>
                  <b>Admin/First </b> & <b>Admin/Second</b> using
                  <a href="#authcontext" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b> AuthContext </b>
                  </a>
                  that intercept request to every page inside
                  <b> admin</b> that declared in <b>AuthContext protectedRoute</b>. if no user was logged in, automatically redirected to login page.
                </li>
                <li>
                  <a href="#next-auth" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Next-Auth </b>
                  </a>
                </li>
                <li>
                  <a href="#signin" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Signin </b>
                  </a>
                </li>
                <li>
                  <a href="#signout" className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer">
                    <b>Signout </b>
                  </a>
                </li>
              </ul>
            </div>

            <div id="protected" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/protected" code={`import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import FullPageLoader from "@components/FullPageLoader";

export default function Protected() {
  const router = useRouter()
  const { status, data: session} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });
  if (status === "loading") return <FullPageLoader />

  return (
    <h1>Id : {session?.id}</h1>
    <h1>Name : {session?.name}</h1>
    <h1>Email : {session?.email}</h1>
    <h1>Token : {session?.token}</h1>
  )
}`} />
            </div>

            <div id="secret" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/secret" code={`import { useSession } from "next-auth/react";

Secret.auth = true

export default function Secret() {
  const { data: session } = useSession();

  return (
    <h1>Id : {session?.id}</h1>
    <h1>Name : {session?.name}</h1>
    <h1>Email : {session?.email}</h1>
    <h1>Token : {session?.token}</h1>
  )
}`} />
            </div>

            <div id="app" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/_app" code={`import { GlobalProvider } from "@utils/GlobalContext";
import { SessionProvider, useSession } from "next-auth/react";
import { AuthProvider } from "@utils/AuthContext";
import FullPageLoader from "@components/FullPageLoader";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <AuthProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
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

export default MyApp`} />
            </div>

            <div id="server" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/server" code={`import { useSession } from "next-auth/react";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import { useRouter } from 'next/router';

export default function Server() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if(status === 'unauthenticated') {
    router.push('/signin');
  }

  return (
    <h1>Id : {session?.id}</h1>
    <h1>Name : {session?.name}</h1>
    <h1>Email : {session?.email}</h1>
    <h1>Token : {session?.token}</h1>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}`} />
            </div>

            <div id="authcontext" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="utils/AuthContext" code={`import { createContext, useEffect, useState } from "react";
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

  const path = router.pathname.split("/").slice(1, 2)
  if (path[0] == "") {
    path[0] = "/"
  }

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
};`} />
            </div>

            <div id="next-auth" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/api/auth/[...nextauth]" code={`import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      authorize: (credentials) => {
        // database look up
        if (credentials.username === "admin" && credentials.password === "password") {
          return {
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
            token: "12345abcde",
            image: null,
          };
        }
        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.token = token.token;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin'
  },
}

export default NextAuth(authOptions);`} />
            </div>

            <div id="signin" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/signin" code={`import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import AlertOutline from "@components/AlertOutline";
import { useSession } from "next-auth/react"
import Router from "next/router";
import Layout from "@components/Layout";

export default function Signin() {
  const { error } = useRouter().query;
  const { status } = useSession();
  
  if(status === 'authenticated') {
    Router.push('/protected')
  }

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");

  function handleChange(e) {
    if (e.target.name == "username") {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  async function handleLogin(e) {
    signIn('credentials', {
        username, password,
        callbackUrl: '/protected',
      }
    )
  }

  return (
    {error &&
      <AlertOutline.red pills>
        <InformationCircleIcon className="h-5 w-5" />Login Failed,
        <span>Check your Username and Password</span>
      </AlertOutline.red>
    }
    <Input name="username" value={username} onChange={handleChange} />
    <Input name="password" value={password} onChange={handleChange} />
    <Button onClick={handleLogin}>Login</Button>
  )
}`} />
            </div>

            <div id="signout" className="mx-auto px-4 sm:px-6 md:px-8 pt-8">
              <Code name="pages/signout" code={`import { signOut } from 'next-auth/react'
import { useEffect } from 'react';
import Router from "next/router";

export default function Signout() {
  useEffect(() => {
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-email");
    Router.replace("/signin");
  }, []);

  signOut({ callbackUrl: '/signin' });

  return ("")
}`} />
            </div>

          </section>

        </main>

        <Footer />

      </Layout>

    </>
  )
}
