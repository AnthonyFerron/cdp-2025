import QuizAttemptCrud from "../crud/quizAttemptCrud";
import { QuizAttempt } from "../models/quizAttempt/quizAttempt.model";
import QuizAttemptTransformer from "../models/quizAttempt/quizAttemptTransformer";
import { IdQuiz, IdUser } from "../types/custom.types";


export default class QuizAttemptBusinessLogic {

    private readonly quizAttemptCrud: QuizAttemptCrud

    constructor() {
        this.quizAttemptCrud = new QuizAttemptCrud()
    }

    async createQuizAttempt(score: number, passed: boolean, startedAt: Date, idQuiz: IdQuiz, idUser: IdUser) {
        await this.quizAttemptCrud.createQuizAttempt(score, passed, startedAt, idQuiz, idUser)
    }

    async getQuizAttempts(idUser: IdUser, idQuiz: IdQuiz): Promise<QuizAttempt[]> {
        const quizAttemptsDb = await this.quizAttemptCrud.getQuizAttempts(idUser, idQuiz)
        return quizAttemptsDb.map(quizAttempt => QuizAttemptTransformer.DbToApi(quizAttempt))
    }
}