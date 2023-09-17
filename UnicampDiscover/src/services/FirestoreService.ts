import { DocumentData, Firestore, collection, getDocs } from "firebase/firestore";

export async function getAllInstitutes (db: Firestore): Promise<DocumentData[]> {
    const institutesCollection = collection(db, 'institute');
    const institutesSnapshot = await getDocs(institutesCollection);
    const institutesList = institutesSnapshot.docs.map((doc) => doc.data());
    return institutesList;
}
