import { InstituteNames } from "../enums/InstituteNamesEnum"

export type DrinkingFountain = {
    id: string
    data: {
        floor: number
        instituteLocation: InstituteNames
    }
}