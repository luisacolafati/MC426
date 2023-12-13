import { Gender } from "../enums/GenderEnum"
import { Institutes } from "../enums/InstitutesEnum"
import { Rating } from "./Rating"

export type Bathroom = {
    id: string
    data: {
        floor: number
        gender: Gender
        isAccessible: boolean
        instituteLocation: Institutes
    }
    rating: Rating
}