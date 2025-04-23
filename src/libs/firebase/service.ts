import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
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

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  const data: Array<UserData> | null =
    snapshot.docs.length > 0
      ? snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          fullname: doc.data().fullname,
          phone: doc.data().phone,
          password: doc.data().password,
          ...doc.data(),
        }))
      : null;

  return data;
}
