import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic"
import CourseSectionBusinessLogic from "@/app/backend/businessLogic/courseSectionBusinessLogic"
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic"
import CourseSectionController from "@/app/backend/controller/courseSectionController"
import CourseCrud from "@/app/backend/crud/courseCrud"
import CourseSectionCrud from "@/app/backend/crud/courseSectionCrud"
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud"


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


export const DELETE = async (req: Request) => courseSectionController.deleteCourseSection(req)
export const POST = async (req: Request) => courseSectionController.createCourseSection(req)
export const PUT = async (req: Request) => courseSectionController.updateCourseSection(req)