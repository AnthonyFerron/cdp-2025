import { IdCourse, IdLanguage } from "../../types/custom.types";
import { Course, CourseDb } from "./course.model";


export default class CourseTransformer {

    static DbToApi(data: CourseDb): Course {
        return {
            title: data.title,
            slug: data.slug,
            idCourse: data.id_course as IdCourse,
            idLanguage: data.id_language as IdLanguage,
            difficulty: data.difficulty,
            isPublished: data.is_published,
            estimatedTime: data.estimated_time,
            createAt: data.create_at
        }
    }
}