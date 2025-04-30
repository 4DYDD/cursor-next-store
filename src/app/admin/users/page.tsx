"use client";

import { UserData } from "@/interfaces/UserData";
import usersServices from "@/services/users";
import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import Table from "./Table/Table";
import { useSession } from "next-auth/react";

const UsersPage = () => {
  const session: any = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [users, setUsers] = useState<Array<UserData>>([]);
  const [showModal, setShowModal] = useState<{
    isOpen: boolean;
    for: "editForm" | "deleteForm" | "";
    user: UserData | null;
  }>({
    isOpen: false,
    for: "",
    user: null,
  });

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;

    event.preventDefault();

    setIsLoading(true);
    setError("");

    const form: any = event.currentTarget;

    const data = {
      role: form.role.value as string,
    };

    const res = await usersServices
      .updateUser(form.userID.value as string, data, session.data?.accessToken)
      .then((response) => {
        console.log(response);
        //
        //
        //
        // Kosongkan data users
        setUsers([]);
        //
        //
        //
        // Ambil data users lagi (FAKE DELAY 2 SECONDS)
        setTimeout(() => {
          usersServices.getAllUsers().then((response: any) => {
            setUsers(response.data.data);
            setIsLoading(false);
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError("Gagal Mengupdate User!");
      })
      .finally(() => {
        //
        //
        // Tutup Modalnya
        setShowModal({ isOpen: false, for: "", user: null });
      });

    console.log(res);
  };

  const handleDeleteUser = async (event: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;

    event.preventDefault();

    setIsLoading(true);
    setError("");

    const form = event.currentTarget;

    console.log(form.userId.value);
    console.log(form.userFullName.value);

    const res = await usersServices
      .deleteUser(form.userId.value as string, session.data?.accessToken)
      .then((response) => {
        console.log(response);
        //
        //
        //
        // Kosongkan data users
        setUsers([]);
        //
        //
        //
        // Ambil data users lagi (FAKE DELAY 2 SECONDS)
        setTimeout(() => {
          usersServices.getAllUsers().then((response: any) => {
            setUsers(response.data.data);
            setIsLoading(false);
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError("Gagal Menghapus User!");
      })
      .finally(() => {
        //
        //
        // Tutup Modalnya
        setShowModal({ isOpen: false, for: "", user: null });
      });

    console.log(res);
  };

  useEffect(() => {
    usersServices.getAllUsers().then((response: any) => {
      setUsers(response.data.data);
    });
  }, []);

  return (
    <>
      {showModal.isOpen === true && (
        <>
          {showModal.for === "editForm" && (
            <Modal
              handleSubmit={handleUpdateUser}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}

          {showModal.for === "deleteForm" && (
            <Modal
              handleSubmit={handleDeleteUser}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </>
      )}

      <h1 className="text-2xl font-bold mb-4">Welcome to Users Page!</h1>

      {/*  */}
      {/*  */}
      {/*  */}
      {/* ===== Simulasi Error Message ===== */}
      {/* {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 rounded relative flexcc"
          role="alert"
        >
          <div className="px-4 py-3">
            <strong className="font-bold leading-none">Error Message</strong>
          </div>

          {[...Array(3)].map((_, index) => (
            <div key={index} className="flexc !justify-start w-full py-2">
              <i className="fa fa-arrow-right mx-2" aria-hidden="true"></i>
              <span className="block sm:inline leading-none">
                {error} {index + 1}
              </span>
            </div>
          ))}
        </div>
      )} */}

      <Table users={users} setShowModal={setShowModal} isLoading={isLoading} />
    </>
  );
};

export default UsersPage;
