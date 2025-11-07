import { IdCourse, IdCourseSection } from "../../types/custom.types"


export type CourseSectionDb = {
    id_course_section: number
    order_by: number
    title: string
    content: string
    image: string | null
    id_course: number
    code: string
}

export type CourseSection = {
    idCourseSection: IdCourseSection
    orderBy: number
    title: string
    content: string
    image: string | null
    idCourse: IdCourse
    code: string
}

export type CourseSectionCreateDto = {
    orderBy?: unknown
    title?: unknown
    content?: unknown
    idCourse?: unknown
    image?: unknown
    code?: unknown
}

export type CourseSectionUpdateDto = {
    idCourseSection?: unknown
    orderBy?: unknown
    title?: unknown
    content?: unknown
    image?: unknown
    idCourse?: unknown
    code?: unknown
}

export type CourseSectionDeleteDto = {
    idCourseSection?: unknown
}