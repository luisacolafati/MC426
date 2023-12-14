import { Rating } from "./Rating"

export type FirestoreDocument = {
    id: string
    data: any
    rating: Rating
}
