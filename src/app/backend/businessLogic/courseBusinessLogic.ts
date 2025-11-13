import CourseCrud from "../crud/courseCrud";
import { GetCourseBusinessLogicError } from "../errors/businessLogic/courseBusinessLogicError";
import { Course } from "../models/course/course.model";
import CourseTransformer from "../models/course/courseTransformer";
import { IdCourse, IdLanguage } from "../types/custom.types";
import ProgrammingLanguageBusinessLogic from "./programmingLanguageBusinessLogic";



export default class CourseBusinessLogic {

    constructor(
        private readonly courseCrud: CourseCrud,
        private readonly programmingLanguageBusinessLogic: ProgrammingLanguageBusinessLogic
    ) {}

    async createCourse(
        title: string,
        slug: string,
        difficulty: number,
        isPublished: boolean,
        estimatedTime: number,
        idLanguage: IdLanguage
    ) {
        // Check if idLanguage is Valid
        await this.programmingLanguageBusinessLogic.getLanguage(idLanguage)

        await this.courseCrud.createCourse(
            title,
            slug,
            difficulty,
            isPublished,
            estimatedTime,
            idLanguage
        )
    }

    async deleteCourse(idCourse: IdCourse) {
        await this.courseCrud.deleteCourse(idCourse)
    }

    async updateCourse(course: Omit<Course, 'createAt'>) {

        // Check if idLanguage is Valid
        await this.programmingLanguageBusinessLogic.getLanguage(course.idLanguage)
        await this.courseCrud.updateCourse(course)
    }

    async getCourse(idCourse: IdCourse): Promise<Course> {
        const courseDb = await this.courseCrud.getCourse(idCourse)
        if (courseDb) {
            return CourseTransformer.DbToApi(courseDb)
        }
        throw new GetCourseBusinessLogicError()
    }

    async getCourses(): Promise<Course[]> {
        const coursesDb = await this.courseCrud.getCourses()
        return coursesDb.map(course => CourseTransformer.DbToApi(course))
    }
}