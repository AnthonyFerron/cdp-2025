import CourseSectionCrud from "../crud/courseSectionCrud";
import { GetCourseSectionBusinessLogicError } from "../errors/businessLogic/courseSectionBusinessLogicError";
import { CourseSection } from "../models/courseSection/courseSection.model";
import CourseSectionTransformer from "../models/courseSection/courseSectionTransformer";
import { IdCourse, IdCourseSection } from "../types/custom.types";
import CourseBusinessLogic from "./courseBusinessLogic";


export default class CourseSectionBusinessLogic {
    
    constructor(
        private readonly courseSectionCrud: CourseSectionCrud,
        private readonly courseBusinessLogic: CourseBusinessLogic
    ) {}

    async createCourseSection(
        orderBy: number,
        title: string,
        content: string,
        idCourse: IdCourse,
        image: string,
        code: string
    ) {

        // Check if idCourse is valid
        await this.courseBusinessLogic.getCourse(idCourse)
        
        await this.courseSectionCrud.createCourseSection(
            orderBy,
            title,
            content,
            idCourse,
            image,
            code
        )
    }

    async updateCourseSection(courseSection: CourseSection) {
        // Check if idCourse is valid
        await this.courseBusinessLogic.getCourse(courseSection.idCourse)
        
        await this.courseSectionCrud.updateCourseSection(courseSection)
    }

    async deleteCourseSection(idSourseSection: IdCourseSection) {
        await this.courseSectionCrud.deleteCouseSection(idSourseSection)
    }

    async getCourseSection(idSourseSection: IdCourseSection): Promise<CourseSection> {
        const courseSectionDb = await this.courseSectionCrud.getCourseSection(idSourseSection)
        if (courseSectionDb) {
            return CourseSectionTransformer.DbToApi(courseSectionDb)
        }
        throw new GetCourseSectionBusinessLogicError()
    }

    async getCourseSections(idCourse: IdCourse): Promise<CourseSection[]> {
        const courseSections = await this.courseSectionCrud.getCourseSections(idCourse)
        return courseSections.map(courseSection => CourseSectionTransformer.DbToApi(courseSection))
    }
}