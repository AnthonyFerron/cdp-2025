import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic"
import CourseSectionBusinessLogic from "@/app/backend/businessLogic/courseSectionBusinessLogic"
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic"
import CourseSectionController from "@/app/backend/controller/courseSectionController"
import CourseCrud from "@/app/backend/crud/courseCrud"
import CourseSectionCrud from "@/app/backend/crud/courseSectionCrud"
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud"
import { NextResponse } from "next/server"


const programmingLanguageCrud = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguageCrud)

const courseCrud = new CourseCrud()
const courseBusinessLogic = new CourseBusinessLogic(
    courseCrud,
    programmingLanguageBusinessLogic
)

const courseSectionCrud = new CourseSectionCrud()
const courseSectionBusinessLogic = new CourseSectionBusinessLogic(
    courseSectionCrud,
    courseBusinessLogic
)
const courseSectionController = new CourseSectionController(courseSectionBusinessLogic)

export const GET = async (req: Request) => {
    const idCourseSection = new URL(req.url).searchParams.get('idCourseSection')
    const idCourse = new URL(req.url).searchParams.get('idCourse')

    if (idCourseSection) {
        return await courseSectionController.getCourseSection(req)
    } else if (idCourse) {
        return await courseSectionController.getCourseSections(req)
    } else {
        return new NextResponse('Le paramètre est invalide', { status: 400 })
    }
}