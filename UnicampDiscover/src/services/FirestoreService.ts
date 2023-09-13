import { DocumentData, collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { firebaseApp } from "../config/FirebaseConfig";

const db = getFirestore(firebaseApp);

export async function getAllInstitutes (): Promise<DocumentData[]> {
    const institutesCollection = collection(db, 'institute');
    const institutesSnapshot = await getDocs(institutesCollection);
    const institutesList = institutesSnapshot.docs.map((doc) => doc.data());
    return institutesList;
}
