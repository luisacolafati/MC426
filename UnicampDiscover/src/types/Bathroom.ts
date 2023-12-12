import { Gender } from "../enums/GenderEnum"
import { Institutes } from "../enums/InstitutesEnum"

export type Bathroom = {
    id: string
    data: {
        floor: number
        gender: Gender
        isAccessible: boolean
        instituteLocation: Institutes
        avaliacao: number
    }
}
