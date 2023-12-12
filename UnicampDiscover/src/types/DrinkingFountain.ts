import { Institutes } from "../enums/InstitutesEnum"

export type DrinkingFountain = {
    id: string
    data: {
        floor: number
        instituteLocation: Institutes
    }
}