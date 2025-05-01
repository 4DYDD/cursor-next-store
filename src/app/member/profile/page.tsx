"use client";

import { OptionalUserData } from "@/interfaces/UserData";
import usersServices from "@/services/users";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<OptionalUserData | null>(null);
  const session: any = useSession();

  const [fullName, setFullName] = useState<string>(profile?.fullname || "");
  const [email, setEmail] = useState<string>(profile?.email || "");
  const [phone, setPhone] = useState<string>(profile?.phone || "");
  const [image, setImage] = useState<any>(null);

  const handleFullNameChange = (event: any) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };

  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= 1 * 1024 * 1024) {
  //     setImage(URL.createObjectURL(file));
  //   } else if (file) {
  //     alert("Ukuran gambar maksimal adalah 1MB.");
  //   }
  // };

  const handleUpdateProfile = () => {
    // Di sini kamu bisa menambahkan logika untuk mengirim data profil ke server
    console.table([
      { "Full Name": fullName },
      { Email: email },
      { Phone: phone },
      { Image: image ? "Uploaded" : "Default" },
    ]);
    alert(
      `Profil berhasil diperbarui!\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nImage: ${
        image ? "Uploaded" : "Default"
      }`
    );
  };

  useEffect(() => {
    if (session.data) {
      usersServices
        .getProfile(session.data.accessToken)
        .then((response: any) => {
          setProfile(response.data.data);
        });
    }
  }, [session]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullname || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="mb-4">
          <h2 className="text-3xl font-bold">Profil Saya</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Bagian Kiri (Avatar) */}
          <div className="col-span-1">
            <div className="rounded-lg border border-gray-300 p-6 bg-white">
              <div className="size-72 rounded-full overflow-hidden border-2 border-dashed border-gray-300 mx-auto mb-4 relative">
                <div
                  className="w-full h-full bg-gray-200 flex items-center justify-center"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files[0];
                    if (
                      file &&
                      file.type.match("image.*") &&
                      file.size <= 1 * 1024 * 1024
                    ) {
                      setImage(URL.createObjectURL(file));
                    }
                  }}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : profile?.image ? (
                    <Image
                      src={profile.image}
                      alt="Avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <i className="fas fa-camera text-9xl text-gray-500"></i>
                    </div>
                  )}
                </div>
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={(event: any) => {
                  const file = event.target.files[0];
                  if (
                    file &&
                    file.type.match("image.*") &&
                    file.size <= 1 * 1024 * 1024
                  ) {
                    setImage(URL.createObjectURL(file));
                  } else {
                    setImage(null);
                  }
                }}
                onClick={(event: any) => {
                  event.target.value = null; // Reset the input value to ensure onChange fires even if the same file is selected again
                }}
              />
              <label
                htmlFor="image"
                className="clicked transall block text-center mt-8 mb-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Pilih gambar lain
              </label>
              <p className="text-center text-sm font-semibold text-gray-400 mt-2 w-[90%] m-auto">
                Ukuran gambar maksimal adalah <b>1MB</b>.
              </p>
            </div>
          </div>

          {/* Bagian Kanan (Formulir) */}
          <div className="col-span-2">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mb-4 space-y-6"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-lg font-bold mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Masukkan nama lengkap Anda (minimal 2 karakter)"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-lg font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Masukkan alamat email Anda yang valid"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-lg font-bold mb-2"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Masukkan nomor telepon Anda (opsional, minimal 8 angka)"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="clicked transall bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                  onClick={() => {
                    setImage(profile?.image || "");
                    setFullName(profile?.fullname || "");
                    setEmail(profile?.email || "");
                    setPhone(profile?.phone || "");
                  }}
                >
                  Reset
                </button>
                <button
                  className="clicked transall bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleUpdateProfile}
                >
                  Update Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
