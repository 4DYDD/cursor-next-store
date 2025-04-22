import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./init";
import { compare, hash } from "bcrypt";
import { UserData } from "@/interfaces/UserData";
import { signUpResponse } from "@/types/SignUpResponse";
import { User } from "next-auth";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data || null;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data || null;
}

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
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  //
  //
  //
  // JIKA ADA USER DENGAN EMAIL YANG SAMA MAKA KEMBALIKAN ERROR
  if (data.length > 0) {
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
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const data: UserData | null =
    snapshot.docs.length > 0
      ? snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          fullname: doc.data().fullname,
          phone: doc.data().phone,
          password: doc.data().password,
          ...doc.data(),
        }))[0]
      : null;

  //
  //
  //
  // JIKA DATA TIDAK DITEMUKAN MAKA KEMBALIKAN NULL
  if (!data) return null;

  //
  //
  //
  // KONFIRMASI PASSWORD, JIKA TIDAK SAMA MAKA KEMBALIKAN NULL, JIKA SAMA MAKA KEMBALIKAN DATA
  const passwordConfirm = await compare(password, data.password as string);
  data.password = undefined;
  return passwordConfirm ? data : null;
}

export async function signInWithGoogle(
  googleUser: User,
  callback: (result: UserData | null) => void
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", googleUser.email)
  );
  const snapshot = await getDocs(q);

  //
  //
  //
  // CEK APAKAH ADA AKUN DI DATABASE DENGAN EMAIL YANG SAMA DENGAN EMAIL DARI AUTENTIKASI GOOGLE
  const user: UserData | null =
    snapshot.docs.length > 0
      ? snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          fullname: doc.data().fullname,
          phone: doc.data().phone,
          password: doc.data().password,
          ...doc.data(),
        }))[0]
      : null;

  //
  //
  //
  // JIKA ADA AKUN DENGAN EMAIL YANG SAMA DI DATABASE, TIMPA DENGAN DATA USER DARI ATUTENTIKASI GOOGLE TERBARU
  if (user) {
    const data: {
      email: string;
      fullname: string;
      image: string;
      type: string;
      role: string;
    } = {
      email: googleUser.email as string,
      fullname: googleUser.name as string,
      image: googleUser.image as string,
      type: "google" as string,
      role: (user.role || "member") as string,
    };

    await updateDoc(doc(firestore, "users", user.id), data)
      .then(() => {
        user.password = undefined;
        callback({
          ...user,
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
    } = {
      email: googleUser.email as string,
      fullname: googleUser.name as string,
      phone: "" as string,
      image: googleUser.image as string,
      type: "google" as string,
      role: "member" as string,
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
