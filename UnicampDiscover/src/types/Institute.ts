import { InstituteNames } from "../enums/InstituteNamesEnum"

export type Institute = {
    name: InstituteNames
    location: {
        latitude: number
        longitude: number
    }
}