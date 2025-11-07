import CrudError from "../errors/crudError";
import { QuizAttemptDb } from "../models/quizAttempt/quizAttempt.model";
import { IdQuiz, IdUser } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class QuizAttemptCrud extends ConfigCrud {

    async createQuizAttempt(score: number, passed: boolean, startedAt: Date, idQuiz: IdQuiz, idUser: IdUser) {
        try {
            await this.prisma.quiz_Attempt.create({
                data: {
                    passed,
                    score,
                    started_at: startedAt,
                    completed_at: new Date(),
                    id_quiz: idQuiz,
                    id_user: idUser
                }
            })
        } catch (err) {
            throw new CrudError('createQuizAttempt', String(err))
        }
    }

    async getQuizAttempts(idUser: IdUser, idQuiz: IdQuiz): Promise<QuizAttemptDb[]> {
        try {
            return await this.prisma.quiz_Attempt.findMany({
                where: {
                    id_quiz: idQuiz,
                    id_user: idUser
                }
            })
        } catch (err) {
            throw new CrudError('getQuizAttempts', String(err))
        }
    }
}