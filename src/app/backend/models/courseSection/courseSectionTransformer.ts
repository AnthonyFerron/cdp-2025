import { IdCourse, IdCourseSection } from "../../types/custom.types";
import { CourseSection, CourseSectionDb } from "./courseSection.model";


export default class CourseSectionTransformer {

    static DbToApi(courseSection: CourseSectionDb): CourseSection {
        return {
            idCourse: courseSection.id_course as IdCourse,
            idCourseSection: courseSection.id_course_section as IdCourseSection,
            image: courseSection.image,
            content: courseSection.content,
            orderBy: courseSection.order_by,
            title: courseSection.title
        }
    }
}