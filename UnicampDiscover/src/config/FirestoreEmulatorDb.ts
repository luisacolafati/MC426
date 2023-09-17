import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { firebaseApp } from "./FirebaseApp"

const dbPointToEmulator = getFirestore(firebaseApp)
connectFirestoreEmulator(dbPointToEmulator, '127.0.0.1', 8080)

export default dbPointToEmulator