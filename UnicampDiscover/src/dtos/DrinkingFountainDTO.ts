import { Institutes } from "../enums/InstitutesEnum"

export interface DrinkingFountainDTO {
    id: string
    data: {
        floor: number
        instituteLocation: Institutes
    }
}