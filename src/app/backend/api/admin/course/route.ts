import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic"
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic"
import CourseController from "@/app/backend/controller/courseController"
import CourseCrud from "@/app/backend/crud/courseCrud"
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud"


const programmingLanguageCrud = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguageCrud)

const courseCrud = new CourseCrud()
const courseBusinessLogic = new CourseBusinessLogic(
    courseCrud,
    programmingLanguageBusinessLogic
)
const courseController = new CourseController(courseBusinessLogic)


export const DELETE = async (req: Request) => courseController.deleteCourse(req)
export const POST = async (req: Request) => courseController.createCourse(req)
export const PUT = async (req: Request) => courseController.updateCourse(req)