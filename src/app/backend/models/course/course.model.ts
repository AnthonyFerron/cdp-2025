import { IdCourse, IdLanguage } from "../../types/custom.types"


export type CourseDb = {
    id_course: number
    title: string
    slug: string
    difficulty: number
    is_published: boolean
    estimated_time: number
    id_language: number
    create_at: Date
}

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

export type CourseCreateDto = {
    title?: unknown
    slug?: unknown
    difficulty?: unknown
    isPublished?: unknown
    estimatedTime?: unknown
    idLanguage?: unknown
}

export type CourseDeleteDto = {
    idCourse?: unknown
}

export type CourseUpdateDto = {
    idCourse?: unknown
    title?: unknown
    slug?: unknown
    difficulty?: unknown
    isPublished?: unknown
    estimatedTime?: unknown
    idLanguage?: unknown
}