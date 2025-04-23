import { UserData } from "@/interfaces/UserData";
import app from "@/libs/firebase/init";
import { retrieveDataByField } from "@/libs/firebase/service";
import { signUpResponse } from "@/types/SignUpResponse";
import { compare, hash } from "bcrypt";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { User } from "next-auth";

const firestore = getFirestore(app);

export async function signUp(userData: UserData): Promise<signUpResponse> {
  //
  //
  //
  // MEMERIKSA APAKAH FULLNAME TIDAK ADA ATAU KOSONG
  if (!userData.fullname || userData.fullname.trim() === "") {
    return {
      status: false,
      message: "Fullname is required and cannot be empty!",
      data: null,
    };
  }

  //
  //
  //
  // MEMERIKSA APAKAH NOMOR TELEPON (PHONE) TIDAK ADA ATAU KOSONG
  if (!userData.phone || userData.phone.trim() === "") {
    return {
      status: false,
      message: "Phone Number is required and cannot be empty!",
      data: null,
    };
  }

  //
  //
  //
  // MEMERIKSA APAKAH EMAIL TIDAK ADA ATAU KOSONG
  if (!userData.email || userData.email.trim() === "") {
    return {
      status: false,
      message: "Email is required and cannot be empty!",
      data: null,
    };
  }

  //
  //
  //
  // MEMERIKSA APAKAH PASSWORD TIDAK ADA ATAU KOSONG
  if (!userData.password || userData.password.trim() === "") {
    return {
      status: false,
      message: "Password is required and cannot be empty!",
      data: null,
    };
  }

  //
  //
  //
  // MEMERIKSA APAKAH EMAIL MEMILIKI FORMAT YANG VALID
  // FORMAT EMAIL YANG VALID ADALAH STRING YANG MENGANDUNG '@', PUNYA USERNAME DAN DOMAIN YANG BENAR
  if (
    typeof userData.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
  ) {
    return {
      status: false,
      message: "Invalid email format!",
      data: null,
    };
  }

  //
  //
  //
  // PERIKSA APAKAH ADA USER DENGAN EMAIL YANG SAMA DI DATABASE

  const user = await retrieveDataByField("users", "email", userData.email);

  //
  //
  //
  // JIKA ADA USER DENGAN EMAIL YANG SAMA MAKA KEMBALIKAN ERROR
  if (user) {
    return {
      status: false,
      message: "Email or Password is Invalid!",
      data: null,
    };
  }

  //
  //
  //
  // JIKA TIDAK ADA USER DENGAN EMAIL YANG SAMA MAKA KEMBALIKAN DATA USER BARU
  else {
    userData.password = await hash(userData.password, 10);
    userData.image = userData.image || "/public/image/genderless-anime.jpeg";
    userData.role = "member";
    userData.type = "credential";
    userData.created_at = new Date();
    userData.updated_at = new Date();

    const theData: signUpResponse = {
      status: true,
      statusCode: 201,
      message: "Register Success!",
      data: userData,
    };

    await addDoc(collection(firestore, "users"), {
      ...userData,
    }).catch((error) => {
      console.error(error);

      theData.status = false;
      theData.statusCode = 500;
      theData.message = `Register Failed! : ${error}`;
      theData.data = null;
    });

    return theData;
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<UserData | null> {
  //
  //
  //
  // JIKA EMAIL DAN PASSWORD KOSONG MAKA KEMBALIKAN NULL
  if (!email) return null;
  if (!password) return null;

  //
  //
  //
  // CEK DATA DI DATABASE DENGAN EMAIL YANG DITENTUKAN
  const user = await retrieveDataByField("users", "email", email);
  //
  //
  //
  // JIKA DATA TIDAK DITEMUKAN MAKA KEMBALIKAN NULL
  if (!user) return null;

  //
  //
  //
  // KONFIRMASI PASSWORD, JIKA TIDAK SAMA MAKA KEMBALIKAN NULL, JIKA SAMA MAKA KEMBALIKAN DATA
  const passwordConfirm = await compare(password, user[0].password as string);
  user[0].password = undefined;
  return passwordConfirm ? user[0] : null;
}

export async function signInWithGoogle(
  googleUser: User,
  callback: (result: UserData | null) => void
) {
  //
  //
  //
  // CEK APAKAH ADA AKUN DI DATABASE DENGAN EMAIL YANG SAMA DENGAN EMAIL DARI AUTENTIKASI GOOGLE
  const user = await retrieveDataByField(
    "users",
    "email",
    googleUser.email as string
  );

  //
  //
  //
  // JIKA ADA AKUN DENGAN EMAIL YANG SAMA DI DATABASE, TIMPA DENGAN DATA USER DARI AUTENTIKASI GOOGLE TERBARU
  if (user) {
    const data: {
      email: string;
      fullname: string;
      image: string;
      type: string;
      role: string;
      updated_at: Date;
    } = {
      email: googleUser.email as string,
      fullname: googleUser.name as string,
      image: googleUser.image as string,
      type: "google" as string,
      role: (user[0].role || "member") as string,
      updated_at: new Date(),
    };

    await updateDoc(doc(firestore, "users", user[0].id), data)
      .then(() => {
        user[0].password = undefined;
        callback({
          ...user[0],
          ...data,
        });
      })
      .catch(() => {
        callback(null);
      });
  }

  //
  //
  //
  // JIKA TIDAK ADA AKUN DENGAN EMAIL YANG SAMA DI DATABASE, BUAT AKUN BARU
  else {
    const data: {
      email: string;
      fullname: string;
      phone: string;
      image: string;
      type: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    } = {
      email: googleUser.email as string,
      fullname: googleUser.name as string,
      phone: "" as string,
      image: googleUser.image as string,
      type: "google" as string,
      role: "member" as string,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({
        ...data,
        id: "",
        password: undefined,
      });
    });
  }
}
