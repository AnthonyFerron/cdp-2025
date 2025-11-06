import QuizCrud from "../crud/quizCrud";
import { GetQuizBusinessLogicError } from "../errors/businessLogic/quizBusinessLogicError";
import { Quiz } from "../models/quiz/quiz.model";
import QuizTransformer from "../models/quiz/quizTransformer";
import { IdCourse, IdQuiz } from "../types/custom.types";
import CourseBusinessLogic from "./courseBusinessLogic";


export default class QuizBusinessLogic {

    constructor(
        private readonly quizCrud: QuizCrud,
        private readonly courseBusinessLogic: CourseBusinessLogic
    ) {}

    async createQuiz(difficulty: number, timeLimit: number, idCourse: IdCourse | null) {

        // Check if idCourse exist
        if (idCourse) {
            await this.courseBusinessLogic.getCourse(idCourse)
        }

        await this.quizCrud.createQuiz(difficulty, timeLimit, idCourse)
    }

    async updateQuiz(quiz: Quiz) {
        // Check if idCourse exist
        if (quiz.idCourse) {
            await this.courseBusinessLogic.getCourse(quiz.idCourse)
        }

        await this.quizCrud.updateQuiz(quiz)
    }

    async deleteQuiz(idQuiz: IdQuiz) {
        await this.quizCrud.deleteQuiz(idQuiz)
    }

    async getQuizWithIdQuiz(idQuiz: IdQuiz): Promise<Quiz> {
        const quizDb = await this.quizCrud.getQuizWithIdQuiz(idQuiz)
        if (quizDb) {
            return QuizTransformer.DbToApi(quizDb)
        }
        throw new GetQuizBusinessLogicError()
    }

    async getQuizWithIdCourse(idCourse: IdCourse): Promise<Quiz> {
        const quizDb = await this.quizCrud.getQuizWithIdCourse(idCourse)
        if (quizDb) {
            return QuizTransformer.DbToApi(quizDb)
        }
        throw new GetQuizBusinessLogicError()
    }

    async getQuizs(): Promise<Quiz[]> {
        const quizsDb = await this.quizCrud.getQuizs()
        return quizsDb.map(quiz => QuizTransformer.DbToApi(quiz))
    }
}