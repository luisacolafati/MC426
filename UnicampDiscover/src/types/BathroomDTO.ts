import { Gender } from "../enums/GenderEnum"
import { Institutes } from "../enums/InstitutesEnum"

export interface BathroomDTO {
    id: string
    data: {
        floor: number
        gender: Gender
        isAccessible: boolean
        instituteLocation: Institutes
    }
}
