import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic"
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic"
import CourseController from "@/app/backend/controller/courseController"
import CourseCurd from "@/app/backend/crud/courseCrud"
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud"


const programmingLanguageCrud = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguageCrud)

const courseCrud = new CourseCurd()
const courseBusinessLogic = new CourseBusinessLogic(
    courseCrud,
    programmingLanguageBusinessLogic
)
const courseController = new CourseController(courseBusinessLogic)


export const GET = async (req: Request) => {
    const id = new URL(req.url).searchParams.get('id')
    if (id) {
        return await courseController.getCourse(req)
    } else {
        return await courseController.getCourses(req)
    }
}