import { Institutes } from "../enums/InstitutesEnum"

export enum Gender {
    MALE,
    FEMALE,
    NEUTRAL
}

export interface BathroomDTO {
    id: string
    data: {
        floor: number
        gender: Gender
        isAccessible: boolean
        instituteLocation: Institutes
        avaliacao: number
    }
}
