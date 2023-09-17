import { getFirestore } from "firebase/firestore"
import { firebaseApp } from "./FirebaseApp"

const db = getFirestore(firebaseApp)

export default db