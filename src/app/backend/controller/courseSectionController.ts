import { NextResponse } from "next/server";
import CourseSectionBusinessLogic from "../businessLogic/courseSectionBusinessLogic";
import { CourseSection, CourseSectionCreateDto, CourseSectionDeleteDto, CourseSectionUpdateDto } from "../models/courseSection/courseSection.model";
import { IdCourse, IdCourseSection } from "../types/custom.types";


export default class CourseSectionController {

    constructor(
        private readonly courseSectionBusinessLogic: CourseSectionBusinessLogic
    ) {}

    async createCourseSection(req: Request) {
        try {
            const {
                orderBy,
                title,
                content,
                idCourse,
                image,
                code
            }: CourseSectionCreateDto = await req.json()

            if (
                orderBy && typeof orderBy === 'number' &&
                title && typeof title === 'string' &&
                content && typeof content === 'string' &&
                code && typeof code === 'string' &&
                idCourse && typeof idCourse === 'number' &&
                typeof image === 'string'
            ) {
                await this.courseSectionBusinessLogic.createCourseSection(
                    orderBy,
                    title,
                    content,
                    idCourse as IdCourse,
                    image,
                    code
                )
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les champs sont incomplets', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateCourseSection(req: Request) {
        try {
            const {
                orderBy,
                title,
                content,
                idCourse,
                image,
                idCourseSection,
                code
            }: CourseSectionUpdateDto = await req.json()

            if (
                orderBy && typeof orderBy === 'number' &&
                title && typeof title === 'string' &&
                code && typeof code === 'string' &&
                content && typeof content === 'string' &&
                idCourse && typeof idCourse === 'number' &&
                idCourseSection && typeof idCourseSection === 'number' &&
                typeof image === 'string'
            ) {
                await this.courseSectionBusinessLogic.updateCourseSection({
                    orderBy,
                    title,
                    content,
                    idCourse: idCourse as IdCourse,
                    idCourseSection: idCourseSection as IdCourseSection,
                    image,
                    code
                })
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les champs sont incomplets', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async deleteCourseSection(req: Request) {
        try {
            const { idCourseSection }: CourseSectionDeleteDto = await req.json()

            if (idCourseSection && typeof idCourseSection === 'number') {
                await this.courseSectionBusinessLogic.deleteCourseSection(idCourseSection as IdCourseSection)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les champs sont incomplets', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCourseSection(req: Request) {
        try {
            const idCourseSection = new URL(req.url).searchParams.get('idCourseSection')

            if (idCourseSection) {
                const courseSection = await this.courseSectionBusinessLogic.getCourseSection(parseInt(idCourseSection) as IdCourseSection)
                return NextResponse.json<CourseSection>(courseSection, { status: 200 })
            } else {
                return new NextResponse('idCourseSection invalide', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCourseSections(req: Request) {
        try {
            const idCourse = new URL(req.url).searchParams.get('idCourse')

            if (idCourse) {
                const courseSections = await this.courseSectionBusinessLogic.getCourseSections(parseInt(idCourse) as IdCourse)
                return NextResponse.json<CourseSection[]>(courseSections, { status: 200 })
            } else {
                return new NextResponse('idCourse invalide', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}