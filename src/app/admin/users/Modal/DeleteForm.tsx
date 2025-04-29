import { UserData } from "@/interfaces/UserData";
import React, { FormEvent, MouseEvent } from "react";

const DeleteForm = ({
  user,
  handleDeleteUser,
  handleClose,
}: {
  user: UserData;
  handleDeleteUser: (event: FormEvent<HTMLFormElement>) => void;
  handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <form onSubmit={handleDeleteUser}>
      <input name="userId" id="userId" type="hidden" value={user.id} />
      <input
        name="userFullName"
        id="userFullName"
        type="hidden"
        value={user.fullname}
      />
      <p className="text-gray-700 mb-4">
        Are you sure you want to delete this user?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleClose}
          type="button"
          className="bg-gray-300 clicked transall text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-red-600 clicked transall text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default DeleteForm;
