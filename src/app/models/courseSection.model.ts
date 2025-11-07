import { IdCourse, IdCourseSection } from "../types/custom.types"


export type CourseSection = {
    idCourseSection: IdCourseSection
    orderBy: number
    title: string
    content: string
    image: string
    idCourse: IdCourse
    code: string
}