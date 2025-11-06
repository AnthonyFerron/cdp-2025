import CrudError from "../errors/crudError";
import { Quiz, QuizDb } from "../models/quiz/quiz.model";
import { IdCourse, IdQuiz } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class QuizCrud extends ConfigCrud {

    async createQuiz(difficulty: number, timeLimit: number, idCourse: IdCourse | null) {
        try {
            await this.prisma.quiz.create({
                data: {
                    difficulty,
                    id_course: idCourse,
                    time_limit: timeLimit
                }
            })
        } catch (err) {
            throw new CrudError('createQuiz', String(err))
        }
    }

    async updateQuiz(quiz: Quiz) {
        try {
            await this.prisma.quiz.update({
                where: {
                    id_quiz: quiz.idQuiz
                },
                data: {
                    difficulty: quiz.difficulty,
                    id_course: quiz.idCourse,
                    time_limit: quiz.timeLimit
                }
            })
        } catch (err) {
            throw new CrudError('updateQuiz', String(err))
        }
    }

    async deleteQuiz(idQuiz: IdQuiz) {
        try {
            await this.prisma.quiz.delete({
                where: {
                    id_quiz: idQuiz
                }
            })
        } catch (err) {
            throw new CrudError('deleteQuiz', String(err))
        }
    }

    async getQuizWithIdQuiz(idQuiz: IdQuiz): Promise<QuizDb | null> {
        try {
            return await this.prisma.quiz.findUnique({
                where: {
                    id_quiz: idQuiz
                }
            })
        } catch (err) {
            throw new CrudError('getQuizWithIdQuiz', String(err))
        }
    }

    async getQuizWithIdCourse(idCourse: IdCourse): Promise<QuizDb | null> {
        try {
            return await this.prisma.quiz.findFirst({
                where: {
                    id_course: idCourse
                }
            })
        } catch (err) {
            throw new CrudError('getQuizWithIdCourse', String(err))
        }
    }

    async getQuizs(): Promise<QuizDb[]> {
        try {
            return await this.prisma.quiz.findMany()
        } catch (err) {
            throw new CrudError('getQuizs', String(err))
        }
    }
}