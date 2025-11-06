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

export const DELETE = async (req: Request) => quizController.deleteQuiz(req)
export const POST = async (req: Request) => quizController.createQuiz(req)
export const PUT = async (req: Request) => quizController.updateQuiz(req)