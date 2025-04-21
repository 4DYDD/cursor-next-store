import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import { compare, hash } from "bcrypt";
import { UserData } from "@/interfaces/UserData";

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

export async function signUp(userData: UserData): Promise<{
  status: boolean;
  message: string;
  data?: UserData | null;
}> {
  if (!userData.fullname) {
    return { status: false, message: "Fullname is required" };
  }
  if (!userData.phone) {
    return {
      status: false,
      message: "Phone Number is required",
    };
  }
  if (!userData.email) {
    return { status: false, message: "Email is required" };
  }
  if (!userData.password) {
    return { status: false, message: "Password is required" };
  }

  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let theData: {
    status: boolean;
    message: string;
    data: UserData | null;
  } | null = null;

  if (data.length > 0) {
    theData = {
      status: false,
      message: "Email or Password is Invalid!",
      data: null,
    };

    return theData;
  } else {
    userData.password = await hash(userData.password, 10);
    userData.image = userData.image || "/public/image/genderless-anime.jpeg";
    userData.role = userData.role || "member";
    userData.type = userData.type || "credential";

    await addDoc(collection(firestore, "users"), {
      ...userData,
    }).catch((error) => {
      console.error(error);
    });

    theData = {
      status: true,
      message: "Register Success!",
      data: userData,
    };

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
