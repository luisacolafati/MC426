import { Bathroom } from '../../types/Bathroom'
import { DrinkingFountain } from '../../types/DrinkingFountain'
import { Institutes } from '../../enums/InstitutesEnum'
import { Gender } from '../../enums/GenderEnum'
import { ReadFileError } from '../../errors/files/ReadFileError'
import * as FileSystem from 'expo-file-system'

export class FileService {
    private static instance: any

    static getInstance (): FileService {
        if (!this.instance) {
            this.instance = new FileService()
        }
        return this.instance
    }

    private getJSONValueByCSVKey (key: string, value: string): string | number | boolean | Gender {
        switch (key) {
            case 'instituteLocation':
                return value as unknown as Institutes
            case 'floor':
                return parseInt(value)
            case 'gender':
                return value as unknown as Gender
            case 'isAccessible':
                return value === "TRUE"
            default:
                return value
        }
    }
    
    private convertCSVStringToJSON (csvString: string): Bathroom[] | DrinkingFountain[] {
        const json: any[] = []

        const csvLines = csvString.split(/\r?\n/)

        const csvKeys = csvLines[0].split(',')

        for (let i = 1; i < csvLines.length; i++) {
            const line = csvLines[i]
            const lineValues = line.split(',')

            let lineAsJson = {
                id: lineValues[0],
                data: {}
            }
            
            for (let j = 1; j < csvKeys.length; j++) {
                lineAsJson.data = {
                    ...lineAsJson.data,
                    [csvKeys[j]]: this.getJSONValueByCSVKey(csvKeys[j], lineValues[j])
                }
            }
            json.push(lineAsJson)
        }

        return json
    }

    async readCSVFileFromUri (fileUri: string): Promise<Bathroom[] | DrinkingFountain[]> {
        try {
            console.log(`[FileService] Reading file from uri ${fileUri}`)
            const csvString = await FileSystem.readAsStringAsync(fileUri)
            return this.convertCSVStringToJSON(csvString)
        } catch (err) {
            console.log(`[FileService] Error reading file from uri ${fileUri}: ${JSON.stringify(err)}`)
            throw new ReadFileError(fileUri, err)
        }
    }
}
