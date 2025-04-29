import { UserData } from "@/interfaces/UserData";
import { FormEvent } from "react";

const role = ["admin", "member"];

const EditForm = ({
  user,
  handleUpdateUser,
}: {
  user: UserData;
  handleUpdateUser: (event: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={handleUpdateUser}>
      {/*  */}
      {/*  */}
      {/*  */}
      <input value={user.id} type="hidden" id="userID" name="userID" />
      {[
        { label: "Fullname", value: user.fullname },
        { label: "Email", value: user.email },
        { label: "Phone", value: user.phone },
      ].map(({ label, value }) => (
        <div key={label} className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <div className="w-full h-10 border border-gray-400 rounded-md px-3 py-2 bg-gray-100 text-left flexc !justify-start">
            {value || "empty"}
          </div>
        </div>
      ))}

      {/*  */}
      {/*  */}
      {/*  */}
      {/* ===== SELECT USER ROLE ===== */}
      <SelectInput user={user} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-800 clicked transall text-white px-4 py-2 rounded hover:bg-black"
        >
          Save
        </button>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
    </form>
  );
};

const SelectInput = ({ user }: { user: UserData }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="role"
        className="text-left block text-sm font-medium text-gray-700 mb-1"
      >
        Role
      </label>
      <select
        id="role"
        name="role"
        className="w-full transall border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:ring-1 hover:ring-gray-300"
        defaultValue={user.role}
      >
        {role.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditForm;
