import * as FileSystem from 'expo-file-system'
import { ReadFileError } from '../../errors/files/ReadFileError'

export class FileService {
    private convertCSVStringToJSON (csvString: string): any {
        const json: any[] = []

        const csvLines = csvString.split(/\r?\n/)

        const csvKeys = csvLines[0].split(';')

        for (let i = 1; i < csvLines.length; i++) {
            const line = csvLines[i]
            const lineValues = line.split(';')
            let lineAsJson = {}
            for (let j = 0; j < csvKeys.length; j++) {
                lineAsJson = {
                    ...lineAsJson,
                    [csvKeys[j]]: lineValues[j]
                }
            }
            json.push(lineAsJson)
        }
        console.log(json)
        return json
    }

    async readCSVFileFromUri (fileUri: string): Promise<any> {
        try {
            const csvString = await FileSystem.readAsStringAsync(fileUri)
            return this.convertCSVStringToJSON(csvString)
        } catch (err) {
            console.log(`[FileService] Error reading file from uri ${fileUri}: ${JSON.stringify(err)}`)
            throw new ReadFileError(fileUri, err)
        }
    }

    async createCSVFileWithNameAndData (fileName: string, data: any): Promise<void> {
        try {
            console.log(`[FileService] Received: ${fileName} - ${data}`)
        } catch (err) {
            console.log(`[FileService] Error creating file: ${JSON.stringify(err)}`)
        }
    }
}
