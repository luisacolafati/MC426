import { Gender } from "../enums/GenderEnum"
import { InstituteNames } from "../enums/InstituteNamesEnum"

export type Bathroom = {
    id: string
    data: {
        floor: number
        gender: Gender
        isAccessible: boolean
        instituteLocation: InstituteNames
    }
}
