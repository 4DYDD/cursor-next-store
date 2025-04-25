"use client";
import { signIn } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="flexc bg-white shadow-gray-300 shadow-md w-full h-[7vh]">
      <ul className="flexc !justify-end space-x-4 p-3.5 w-full">
        <li>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 hover:bg-black hover:text-white rounded transall clicked flexc space-x-2 font-semibold"
          >
            <i className="fas fa-sign-in-alt"></i>
            <span>Sign In</span>
          </button>
        </li>
        {/* Uncomment and add logic for Sign Out */}
        {/* <li>
                                                                                        <Link
                                                                                                        href="/signout"
                                                                                                        className="p-2 hover:bg-black hover:text-white rounded"
                                                                                        >
                                                                                                        Sign Out
                                                                                        </Link>
                                                                        </li> */}
        {/* Uncomment and add logic for user info */}
        {/* <li>
                                                                                        <div className="flex items-center space-x-2">
                                                                                                        <img
                                                                                                                        src="/path-to-user-image"
                                                                                                                        alt="User"
                                                                                                                        className="w-8 h-8 rounded-full"
                                                                                                        />
                                                                                                        <span>Username</span>
                                                                                        </div>
                                                                        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
