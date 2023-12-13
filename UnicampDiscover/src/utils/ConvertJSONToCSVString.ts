import { FirestoreDocument } from "../types/FirestoreDocument"

export const convertFirestoreDocumentToCSVString = (json: FirestoreDocument[]): string => {
    let CSVString = ''

    const firstLine = 'id,' + Object.keys(json[0].data).join(',') + '\n'
    CSVString += firstLine

    json.forEach(object => {
        const nextLine = object.id + ',' + Object.values(object.data).join(',') + '\n'
        CSVString += nextLine
    })

    return CSVString
}
