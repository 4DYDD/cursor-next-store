import React, { Dispatch } from "react";
import { UserData } from "../../../../interfaces/UserData";
import Skeleton from "./Skeleton";
import Thead from "./Thead";

const Table = ({
  users,
  setShowModal,
  isLoading,
}: {
  users: Array<UserData>;
  setShowModal: Dispatch<{
    isOpen: boolean;
    for: "editForm" | "deleteForm" | "";
    user: UserData | null;
  }>;
  isLoading: boolean;
}) => {
  return (
    <>
      <table className="w-[90%] border-collapse mt-5 shadow-lg rounded-lg overflow-hidden text-sm sm:text-base">
        <Thead header={["#", "Fullname", "Email", "Phone", "Role", "Action"]} />
        <tbody>
          {users?.length > 0 &&
            users.map((user: UserData, index: number) => (
              <tr key={user.id} className="border-b">
                <td>{index + 1}</td>

                {[user.fullname, user.email, user.phone, user.role].map(
                  (item, index) => (
                    <td key={index} className="px-2 py-1 sm:px-3 sm:py-1.5">
                      {item || "empty"}
                    </td>
                  )
                )}

                {/*  */}
                {/*  */}
                {/*  */}
                {/* ===== ACTION ===== */}
                <td className="px-2 py-1 sm:px-3 sm:py-1.5">
                  <div className="flex space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1.5">
                    <button
                      onClick={() => {
                        if (isLoading) return;
                        setShowModal({ isOpen: true, for: "editForm", user });
                      }}
                      type="button"
                      className="clicked font-semibold px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm"
                    >
                      {isLoading ? "Loading..." : "Edit"}
                    </button>
                    <button
                      onClick={() => {
                        if (isLoading) return;
                        setShowModal({ isOpen: true, for: "deleteForm", user });
                      }}
                      type="button"
                      className="clicked font-semibold px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      {isLoading ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          {users?.length <= 0 &&
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
