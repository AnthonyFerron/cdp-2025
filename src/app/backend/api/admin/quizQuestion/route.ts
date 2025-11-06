import CourseBusinessLogic from "@/app/backend/businessLogic/courseBusinessLogic";
import ProgrammingLanguageBusinessLogic from "@/app/backend/businessLogic/programmingLanguageBusinessLogic";
import QuizBusinessLogic from "@/app/backend/businessLogic/quizBusinessLogic";
import QuizQuestionBusinessLogic from "@/app/backend/businessLogic/quizQuestionBusinessLogic";
import { QuizQuestionController } from "@/app/backend/controller/quizQuestionController";
import CourseCrud from "@/app/backend/crud/courseCrud";
import ProgrammingLanguageCrud from "@/app/backend/crud/programmingLanguageCrud";
import QuizCrud from "@/app/backend/crud/quizCrud";
import { QuizQuestionCrud } from "@/app/backend/crud/quizQuestionCrud";


const programmingLanguage = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguage)

const courseCrud = new CourseCrud()
const courseBusinessLogic = new CourseBusinessLogic(courseCrud, programmingLanguageBusinessLogic)

const quizCrud = new QuizCrud()
const quizBusinessLogic = new QuizBusinessLogic(quizCrud, courseBusinessLogic)

const quizQuestionCrud = new QuizQuestionCrud()
const quizQuestionBusinessLogic = new QuizQuestionBusinessLogic(quizQuestionCrud, quizBusinessLogic)
const quizQuestionController = new QuizQuestionController(quizQuestionBusinessLogic)

export const POST = async (req: Request) => quizQuestionController.createQuizQuestion(req)
export const PUT = async (req: Request) => quizQuestionController.updateQuizQuestion(req)
export const DELETE = async (req: Request) => quizQuestionController.deleteQuizQuestion(req)