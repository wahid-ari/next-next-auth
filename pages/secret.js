import Head from "next/head";
import Footer from "@components/Footer"
import Navbar from "@components/Navbar";
import Layout from "@components/Layout";
import { useSession } from "next-auth/react";

Secret.auth = true

export default function Secret() {
	const { data: session } = useSession();

	return (
		<div>
			<Head>
				<title>Secret Page</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />

			<Layout>

				<main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen">
					<section className="text-gray-600 body-font py-8">
						<h1 className="text-center font-medium text-3xl dark:text-white mb-8">Secret Page</h1>
						<h1 className="text-center font-medium text-xl dark:text-white ">If you can see this, it means you are logged in.</h1>
						<h1 className="text-center font-medium text-xl dark:text-white mb-4">
							This page did the auth checking using  <b>Auth</b> component inside the <b>_app.js</b>. <br/> if no user was logged in, automatically redirected to login page.</h1>
						<h1 className="text-center font-medium dark:text-white">Id : {session?.id}</h1>
						<h1 className="text-center font-medium dark:text-white">Name : {session?.name}</h1>
						<h1 className="text-center font-medium dark:text-white">Email : {session?.email}</h1>
						<h1 className="text-center font-medium dark:text-white break-all">Token : {session?.token}</h1>
					</section>
				</main>

				<Footer />

			</Layout>

		</div>
	);
}