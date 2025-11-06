import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic";
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic";
import QuizBusinessLogic from "@/app/backend/businessLogic/quizBusinessLogic";
import QuizController from "@/app/backend/controller/quizController";
import CourseCrud from "@/app/backend/crud/courseCrud";
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud";
import QuizCrud from "@/app/backend/crud/quizCrud";


const programmingLanguage = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguage)

const courseCrud = new CourseCrud()
const courseBusinessLogic = new CourseBusinessLogic(courseCrud, programmingLanguageBusinessLogic)

const quizCrud = new QuizCrud()
const quizBusinessLogic = new QuizBusinessLogic(quizCrud, courseBusinessLogic)
const quizController = new QuizController(quizBusinessLogic)

export const GET = async (req: Request) => {
    const idQuiz = new URL(req.url).searchParams.get('idQuiz')
    const idCourse = new URL(req.url).searchParams.get('idCourse')

    if (idQuiz) {
        return await quizController.getQuizWithIdQuiz(req)
    } else if (idCourse) {
        return await quizController.getQuizWithIdCourse(req)
    } else {
        return await quizController.getQuizs(req)
    }
}