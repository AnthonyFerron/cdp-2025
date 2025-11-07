import { QuizQuestionCrud } from "../crud/quizQuestionCrud";
import { GetQuizQuestionBusinessLogicError, GetQuizQuestionsBusinessLogicError } from "../errors/businessLogic/quizQuestionBusinessLogicError";
import { QuizQuestion } from "../models/quizQuestion/quizQuestion.model";
import QuizQuestionTransformer from "../models/quizQuestion/quizQuestionTransformer";
import { IdQuiz, IdQuizQuestion } from "../types/custom.types";
import QuizBusinessLogic from "./quizBusinessLogic";


export default class QuizQuestionBusinessLogic {

    constructor(
        private readonly quizQuestionCrud: QuizQuestionCrud,
        private readonly quizBusinessLogic: QuizBusinessLogic
    ) {}

    async createQuizQuestion(question: string, choices: string[], answer: number[], idQuiz: IdQuiz) {

        // Check if idQuiz Exist
        await this.quizBusinessLogic.getQuizWithIdQuiz(idQuiz)

        await this.quizQuestionCrud.createQuizQuestion(question, choices, answer, idQuiz)
    }

    async updateQuizQuestion(quizQuestion: QuizQuestion) {
        // Check if idQuiz Exist
        await this.quizBusinessLogic.getQuizWithIdQuiz(quizQuestion.idQuiz)

        await this.quizQuestionCrud.updateQuizQuestion(quizQuestion)
    }

    async deleteQuizQuestion(idQuizQuestion: IdQuizQuestion) {
        await this.quizQuestionCrud.deleteQuizQuestion(idQuizQuestion)
    }

    async getQuizQuestions(idQuiz: IdQuiz, withResponse: boolean): Promise<QuizQuestion[]> {
        const quizQuestionsDb = await this.quizQuestionCrud.getQuizQuestions(idQuiz)
        if (quizQuestionsDb) {
            return quizQuestionsDb
                .map(question => QuizQuestionTransformer.DbToApi(question))
                .map(question => {
                    return {
                        ...question,
                        answer: withResponse ? question.answer : []
                    }
                })
        }
        throw new GetQuizQuestionsBusinessLogicError()
    }

    async getQuizQuestion(idQuizQuestion: IdQuizQuestion, withResponse: boolean): Promise<QuizQuestion> {
        const quizQuestionDb = await this.quizQuestionCrud.getQuizQuestion(idQuizQuestion)
        if (quizQuestionDb) {
            const data = QuizQuestionTransformer.DbToApi(quizQuestionDb)
            return {
                ...data,
                answer: withResponse ? data.answer : []
            }
        }
        throw new GetQuizQuestionBusinessLogicError()
    }
}