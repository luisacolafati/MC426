import { Institutes } from "../enums/InstitutesEnum"
import { Rating } from "./Rating"

export type DrinkingFountain = {
    id: string
    data: {
        floor: number
        instituteLocation: Institutes
        avaliacao: [number, number]
    }
    rating: Rating
}
