import {
    DocumentReference,
    CollectionReference,
    addDoc,
    collection,
    getDocs,
    getFirestore,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../config/FirebaseConfig";
import { AddDocumentError } from "../../errors/firestore/AddDocumentError";
import { UpdateDocumentError } from "../../errors/firestore/UpdateDocumentError";
import { DeleteDocumentError } from "../../errors/firestore/DeleteDocumentError";
import { GetAllDocumentsError } from "../../errors/firestore/GetAllDocumentsError";
import { FirestoreDocumentDTO } from "../../dtos/FirestoreDocumentDTO";

export class FirestoreService {
    private readonly db = getFirestore(firebaseApp)
    private readonly collection: CollectionReference

    constructor (collectionName: string) {
        this.collection = collection(this.db, collectionName)
    }

    private getDocumentReference (document: FirestoreDocumentDTO): DocumentReference {
        return doc(this.collection, document.id)
    }

    async addDocument (document: FirestoreDocumentDTO): Promise<DocumentReference> {
        try {
            const aaa = await addDoc(this.collection, document.data)
            console.log(aaa)
            return aaa
        } catch (err) {
            console.log(`[FirestoreService] Error adding document: ${JSON.stringify(err)}`)
            throw new AddDocumentError(err)
        }
    }

    async getAllDocuments (): Promise<any[]> {
        try {
            const snapshot = await getDocs(this.collection)
            const documents = snapshot.docs.map((doc) => {
                const id = doc.id
                const documentData = doc.data()
                return {
                    id,
                    data: {
                        ...documentData
                    }
                }
            })
            console.log(documents)
            return documents
        } catch (err) {
            console.log(`[FirestoreService] Error getting all document from collection ${this.collection.id}: ${JSON.stringify(err)}`)
            throw new GetAllDocumentsError(this.collection.id, err)
        }
    }

    async updateDocument (document: FirestoreDocumentDTO): Promise<void> {
        try {
            const documentReference = this.getDocumentReference(document)
            await updateDoc(documentReference, document.data)
        } catch (err) {
            console.log(`[FirestoreService] Error updating document: ${JSON.stringify(err)}`)
            throw new UpdateDocumentError(err)
        }
    }

    async deleteDocument (document: FirestoreDocumentDTO): Promise<void> {
        try {
            const documentReference = this.getDocumentReference(document)
            await deleteDoc(documentReference)
        } catch (err) {
            console.log(`[FirestoreService] Error deleting document: ${JSON.stringify(err)}`)
            throw new DeleteDocumentError(err)
        }
    }
}
