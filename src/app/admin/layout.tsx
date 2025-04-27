"use client";

import Head from "next/head";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <div className="flexc">
        <Sidebar />
        <div className="flex-1 flexcc !justify-start h-[100vh]">
          <Navbar />
          <main className="p-5 flexcc w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
