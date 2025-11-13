import CrudError from "../errors/crudError";
import { QuizQuestion, QuizQuestionDb } from "../models/quizQuestion/quizQuestion.model";
import { IdQuiz, IdQuizQuestion } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export class QuizQuestionCrud extends ConfigCrud {

    async createQuizQuestion(question: string, choices: string[], answer: number[], idQuiz: IdQuiz) {
        try {
            await this.prisma.quiz_question.create({
                data: {
                    question,
                    id_quiz: idQuiz,
                    choices: JSON.stringify(choices),
                    answer: JSON.stringify(answer)
                }
            })
        } catch (err) {
            throw new CrudError('createQuizQuestion', String(err))
        }
    }

    async updateQuizQuestion(quizQuestion: QuizQuestion) {
        try {
            await this.prisma.quiz_question.update({
                where: {
                    id_quiz_question: quizQuestion.idQuizQuestion
                },
                data: {
                    question: quizQuestion.question,
                    choices: JSON.stringify(quizQuestion.choices),
                    answer: JSON.stringify(quizQuestion.answer),
                    id_quiz: quizQuestion.idQuiz
                }
            })
        } catch (err) {
            throw new CrudError('updateQuizQuestion', String(err))
        }
    }

    async deleteQuizQuestion(idQuizQuestion: IdQuizQuestion) {
        try {
            await this.prisma.quiz_question.delete({
                where: {
                    id_quiz_question: idQuizQuestion
                }
            })
        } catch (err) {
            throw new CrudError('deleteQuizQuestion', String(err))
        }
    }

    async getQuizQuestions(idQuiz: IdQuiz): Promise<QuizQuestionDb[] | null> {
        try {
            return this.prisma.quiz_question.findMany({
                where: {
                    id_quiz: idQuiz
                }
            })
        } catch (err) {
            throw new CrudError('getQuizQuestions', String(err))
        }
    }

    async getQuizQuestion(idQuizQuestion: IdQuizQuestion): Promise<QuizQuestionDb | null> {
        try {
            return this.prisma.quiz_question.findUnique({
                where: {
                    id_quiz_question: idQuizQuestion
                }
            })
        } catch (err) {
            throw new CrudError('getQuizQuestion', String(err))
        }
    }
}