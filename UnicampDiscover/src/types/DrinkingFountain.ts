import { InstituteNames } from "../enums/InstituteNamesEnum"
import { Rating } from "./Rating"

export type DrinkingFountain = {
    id: string
    data: {
        floor: number
        instituteLocation: InstituteNames
    }
    rating: Rating
}
