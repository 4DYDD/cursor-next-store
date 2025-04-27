"use client";

import { UserData } from "@/interfaces/UserData";
import usersServices from "@/services/users";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<Array<UserData>>([]);

  useEffect(() => {
    usersServices.getAllUsers().then((response: any) => {
      setUsers(response.data.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to Users Page!</h1>
      <table className="w-[90%] border-collapse mt-5 shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            {["#", "Fullname", "Email", "Phone", "Role", "Action"].map(
              (header) => (
                <th key={header} className="p-2 sm:p-3">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user: UserData, index) => (
              <tr key={user.id} className="border-b">
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">{index + 1}</td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  {user.fullname || "empty"}
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  {user.email || "empty"}
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  {user.phone || "empty"}
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  {user.role || "empty"}
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="flex space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1.5">
                    <button
                      type="button"
                      className="clicked px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="clicked px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          {users.length <= 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="h-8 sm:h-10 my-1 sm:my-2 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
