import CrudError from "../errors/crudError";
import { Course, CourseDb } from "../models/course/course.model";
import { IdCourse, IdLanguage } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class CourseCrud extends ConfigCrud {

    async createCourse(
        title: string,
        slug: string,
        difficulty: number,
        isPublished: boolean,
        estimatedTime: number,
        idLanguage: IdLanguage
    ) {
        try {
            await this.prisma.course.create({
                data: {
                    title,
                    slug,
                    difficulty,
                    is_published: isPublished,
                    estimated_time: estimatedTime,
                    id_language: idLanguage
                }
            })
        } catch (err) {
            throw new CrudError('createCourse', String(err))
        }
    }

    async updateCourse(course: Omit<Course, 'createAt'>) {
        try {
            await this.prisma.course.update({
                where: {
                    id_course: course.idCourse
                },
                data: {
                    title: course.title,
                    slug: course.slug,
                    difficulty: course.difficulty,
                    is_published: course.isPublished,
                    estimated_time: course.estimatedTime,
                    id_course: course.idLanguage
                }
            })
        } catch (err) {
            throw new CrudError('updateCourse', String(err))
        }
    }

    async deleteCourse(idCourse: IdCourse) {
        try {
            await this.prisma.course.delete({
                where: {
                    id_course: idCourse
                }
            })
        } catch (err) {
            throw new CrudError('deleteCourse', String(err))
        }
    }

    async getCourse(idCourse: IdCourse): Promise<CourseDb | null> {
        try {
            return await this.prisma.course.findUnique({
                where: {
                    id_course: idCourse
                }
            })
        } catch (err) {
            throw new CrudError('getCourse', String(err))
        }
    }

    async getCourses(): Promise<CourseDb[]> {
        try {
            return await this.prisma.course.findMany()
        } catch (err) {
            throw new CrudError('getCourses', String(err))
        }
    }
}