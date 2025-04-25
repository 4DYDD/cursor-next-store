"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const {
    data,
    status,
  }: { data: any; status: "authenticated" | "loading" | "unauthenticated" } =
    useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flexc bg-white shadow w-full h-[7vh]">
      <ul className="flexc !justify-end space-x-4 p-3.5 w-full">
        {/* Uncomment and add logic for user info */}
        {status === "authenticated" && (
          <li>
            <div className="flex items-center space-x-2">
              <div className="size-8 bg-red-500 overflow-hidden rounded-full">
                <Image
                  width={500}
                  height={500}
                  src={`${data?.image || "/image/genderless-anime.jpeg"}`}
                  alt="User"
                  className="w-full object-cover"
                />
              </div>
              <span>Username</span>
            </div>
          </li>
        )}

        <li>
          <button
            onClick={() => {
              if (isLoading) return;
              if (status === "loading") return;

              if (status === "authenticated") {
                signOut();
              } else {
                signIn();
              }
            }}
            className="px-4 py-2 hover:bg-black hover:text-white rounded transall clicked flexc space-x-2 font-semibold"
          >
            {status === "unauthenticated" && (
              <>
                <i className="fas fa-right-to-bracket"></i>{" "}
                {/* Ikon untuk Sign In */}
                <span>Sign In</span>
              </>
            )}

            {status === "authenticated" && (
              <>
                <i className="fas fa-right-from-bracket"></i>{" "}
                {/* Ikon untuk Sign Out */}
                <span>Sign Out</span>
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
