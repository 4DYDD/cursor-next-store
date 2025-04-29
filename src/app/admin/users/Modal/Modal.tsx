import { UserData } from "@/interfaces/UserData";
import React, { Dispatch, FormEvent, MouseEvent } from "react";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

const Modal = ({
  showModal,
  setShowModal,
  handleSubmit,
}: {
  showModal: {
    isOpen: boolean;
    for: "editForm" | "deleteForm" | "";
    user: UserData | null;
  };
  setShowModal: Dispatch<{
    isOpen: boolean;
    for: "editForm" | "deleteForm" | "";
    user: UserData | null;
  }>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => {
  const handleClose = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setShowModal({ isOpen: false, for: "", user: null });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flexc z-50 animate-squish"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 size-10 clicked transall text-xl"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>

          {/*  */}
          {/*  */}
          {/*  */}
          {/* ===== Munculkan Edit Form ===== */}
          {showModal.for === "editForm" && (
            <>
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <EditForm
                user={showModal.user as UserData}
                handleUpdateUser={handleSubmit}
              />
            </>
          )}

          {/*  */}
          {/*  */}
          {/*  */}
          {/* ===== Munculkan Delete Form ===== */}
          {showModal.for === "deleteForm" && (
            <>
              <h2 className="text-xl font-bold mb-4">Delete User</h2>
              <DeleteForm
                user={showModal.user as UserData}
                handleDeleteUser={handleSubmit}
                handleClose={handleClose}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
