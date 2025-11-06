import CrudError from "../errors/crudError";
import { CourseSection, CourseSectionDb } from "../models/courseSection/courseSection.model";
import { IdCourse, IdCourseSection } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class CourseSectionCrud extends ConfigCrud {

    async createCourseSection(
        orderBy: number,
        title: string,
        content: string,
        idCourse: IdCourse,
        image: string
    ) {
        try {
            await this.prisma.course_section.create({
                data: {
                    order_by: orderBy,
                    title,
                    content,
                    id_course: idCourse,
                    image
                }
            })
        } catch (err) {
            throw new CrudError('createCourseSection', String(err))
        }
    }

    async updateCourseSection(courseSection: CourseSection) {
        try {
            await this.prisma.course_section.update({
                where: {
                    id_course_section: courseSection.idCourseSection
                },
                data: {
                    order_by: courseSection.orderBy,
                    title: courseSection.title,
                    content: courseSection.content,
                    id_course: courseSection.idCourse,
                    image: courseSection.image
                }
            })
        } catch (err) {
            throw new CrudError('updateCourseSection', String(err))
        }
    }

    async deleteCouseSection(courseSectionId: IdCourseSection) {
        try {
            await this.prisma.course_section.delete({
               where: {
                    id_course_section: courseSectionId
                } 
            })
        } catch (err) {
            throw new CrudError('deleteCouseSection', String(err))
        }
    }

    async getCourseSection(courseSectionId: IdCourseSection): Promise<CourseSectionDb | null> {
        try {
            return await this.prisma.course_section.findUnique({
                where:  {
                    id_course_section: courseSectionId
                }
            })
        } catch (err) {
            throw new CrudError('getCourseSection', String(err))
        }
    }

    async getCourseSections(idCourse: IdCourse): Promise<CourseSectionDb[]> {
        try {
            return await this.prisma.course_section.findMany({
                where: {
                    id_course: idCourse
                }
            })
        } catch (err) {
            throw new CrudError('getCourseSections', String(err))
        }
    }
}