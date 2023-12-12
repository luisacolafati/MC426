import { InstituteNames } from "../enums/InstituteNamesEnum"

export type Institute = {
    id: string
    data: {
        name: InstituteNames
        location: {
            latitude: number
            longitude: number
        }
    }
}