import { IdCourse, IdLanguage } from "../types/custom.types"

export type Course = {
    idCourse: IdCourse
    title: string
    slug: string
    difficulty: number
    isPublished: boolean
    estimatedTime: number
    idLanguage: IdLanguage
    createAt: Date
}