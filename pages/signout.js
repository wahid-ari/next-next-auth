import { signOut } from 'next-auth/react'
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

  return (
    <>
    </>
  )
}