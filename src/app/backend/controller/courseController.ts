import { NextResponse } from "next/server";
import CourseBusinessLogic from "../businessLogic/courseBusinessLogic";
import { Course, CourseCreateDto, CourseDeleteDto, CourseUpdateDto } from "../models/course/course.model";
import { IdCourse, IdLanguage } from "../types/custom.types";


export default class CourseController {

    constructor(
        private readonly courseBusinessLogic: CourseBusinessLogic
    ) {}

    async createCourse(req: Request) {
        try {
            const {
                title,
                slug,
                difficulty,
                isPublished,
                estimatedTime,
                idLanguage
            }: CourseCreateDto = await req.json()

            if (
                title && typeof title === 'string' &&
                slug && typeof slug === 'string' &&
                difficulty && typeof difficulty === 'number' &&
                typeof isPublished === 'boolean' &&
                estimatedTime && typeof estimatedTime === 'number' &&
                idLanguage && typeof idLanguage === 'number'
            ) {
                await this.courseBusinessLogic.createCourse(
                    title,
                    slug,
                    difficulty,
                    isPublished,
                    estimatedTime,
                    idLanguage as IdLanguage
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

    async updateCourse(req: Request) {
        try {
            const {
                title,
                slug,
                difficulty,
                isPublished,
                estimatedTime,
                idLanguage,
                idCourse
            }: CourseUpdateDto = await req.json()

            if (
                title && typeof title === 'string' &&
                slug && typeof slug === 'string' &&
                difficulty && typeof difficulty === 'number' &&
                typeof isPublished === 'boolean' &&
                estimatedTime && typeof estimatedTime === 'number' &&
                idLanguage && typeof idLanguage === 'number' &&
                idCourse && typeof idCourse === 'number'
            ) {
                await this.courseBusinessLogic.updateCourse({
                    idCourse: idCourse as IdCourse,
                    idLanguage: idLanguage as IdLanguage,
                    title,
                    slug,
                    difficulty,
                    isPublished,
                    estimatedTime
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

    async deleteCourse(req: Request) {
        try {
            const { idCourse }: CourseDeleteDto = await req.json()

            if (idCourse && typeof idCourse === 'number') {
                await this.courseBusinessLogic.deleteCourse(idCourse as IdCourse)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les champs sont incomplets', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCourse(req: Request) {
        try {
            const id = new URL(req.url).searchParams.get('id')

            if (id) {
                const course = await this.courseBusinessLogic.getCourse(parseInt(id) as IdCourse)
                return NextResponse.json<Course>(course, { status: 200 })
            } else {
                return new NextResponse('idCourse est invalide', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCourses(req: Request) {
        try {
            const courses = await this.courseBusinessLogic.getCourses()
            return NextResponse.json<Course[]>(courses, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}