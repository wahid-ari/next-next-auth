import { useContext } from "react";
import { AuthContext } from "@utils/AuthContext";
import Head from 'next/head'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import Layout from '@components/Layout';

export default function Second() {

  const user = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Admin - Second</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Layout>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen">

          <section className="text-gray-600 body-font py-8">
            <h1 className="text-center font-medium text-3xl dark:text-white mb-4">Admin - Second</h1>
            <h1 className="text-center font-medium text-xl dark:text-white mb-4">Protected using AuthContext</h1>
            <h1 className="text-center font-medium text-xl dark:text-white ">If you can see this, it means you are logged in.</h1>
            <h1 className="text-center font-medium text-xl dark:text-white mb-4">
              This page did the auth checking using  <b>AuthContext</b>, if no user was logged in, automatically redirected to login page.</h1>
            <h1 className="text-center font-medium dark:text-white">Id : {user?.userId}</h1>
            <h1 className="text-center font-medium dark:text-white">Name : {user?.userName}</h1>
            <h1 className="text-center font-medium dark:text-white break-all">Email : {user?.userEmail}</h1>
          </section>

        </main>

        <Footer />

      </Layout>

    </>
  )
}