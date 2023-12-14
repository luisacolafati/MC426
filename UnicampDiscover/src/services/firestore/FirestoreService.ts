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
import { FirestoreDocument } from "../../types/FirestoreDocument";

export class FirestoreService {
    private readonly db = getFirestore(firebaseApp)
    private readonly collection: CollectionReference

    constructor (collectionName: string) {
        this.collection = collection(this.db, collectionName)
    }

    private getDocumentReference (document: FirestoreDocument): DocumentReference {
        return doc(this.collection, document.id)
    }

    async addDocument (document: FirestoreDocument): Promise<DocumentReference> {
        try {
            return await addDoc(this.collection, {
                ...document.data,
                rating: {
                    averageRate: 5,
                    numberOfRates: 0
                }
            })
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
                const rating = documentData.rating
                delete documentData.rating
                return {
                    id,
                    data: {
                        ...documentData
                    },
                    rating
                }
            })
            console.log('documents', documents)
            return documents
        } catch (err) {
            console.log(`[FirestoreService] Error getting all document from collection ${this.collection.id}: ${JSON.stringify(err)}`)
            throw new GetAllDocumentsError(this.collection.id, err)
        }
    }

    async updateDocument (document: FirestoreDocument): Promise<void> {
        try {
            const documentReference = this.getDocumentReference(document)
            await updateDoc(documentReference, { ...document.data, rating: document.rating })
        } catch (err) {
            console.log(`[FirestoreService] Error updating document: ${JSON.stringify(err)}`)
            throw new UpdateDocumentError(err)
        }
    }

    async deleteDocument (document: FirestoreDocument): Promise<void> {
        try {
            const documentReference = this.getDocumentReference(document)
            await deleteDoc(documentReference)
        } catch (err) {
            console.log(`[FirestoreService] Error deleting document: ${JSON.stringify(err)}`)
            throw new DeleteDocumentError(err)
        }
    }
}
