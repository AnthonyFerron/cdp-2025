import { NextResponse } from "next/server";
import QuizQuestionBusinessLogic from "../businessLogic/quizQuestionBusinessLogic";
import { QuizQuestion, QuizQuestionCreateDto, QuizQuestionDeleteDto, QuizQuestionUpdateDto } from "../models/quizQuestion/quizQuestion.model";
import { IdQuiz, IdQuizQuestion } from "../types/custom.types";


export class QuizQuestionController {

    constructor(
        private readonly quizQuestionBusinessLogic: QuizQuestionBusinessLogic
    ) {}

    async createQuizQuestion(req: Request) {
        try {
            const {
                question,
                idQuiz,
                answer,
                choices
            }: QuizQuestionCreateDto = await req.json()

            if (
                question && typeof question === 'string' &&
                answer && Array.isArray(answer) && !answer.some(c => typeof c !== 'number') &&
                idQuiz && typeof idQuiz === 'number' &&
                choices && Array.isArray(choices) && !choices.some(c => typeof c !== 'string')
            ) {
                await this.quizQuestionBusinessLogic.createQuizQuestion(question, choices, answer, idQuiz as IdQuiz)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateQuizQuestion(req: Request) {
        try {
            const {
                question,
                idQuiz,
                answer,
                choices,
                idQuizQuestion
            }: QuizQuestionUpdateDto = await req.json()

            if (
                question && typeof question === 'string' &&
                answer && Array.isArray(answer) && !answer.some(c => typeof c !== 'number') &&
                idQuiz && typeof idQuiz === 'number' &&
                idQuizQuestion && typeof idQuizQuestion === 'number' &&
                choices && Array.isArray(choices) && !choices.some(c => typeof c !== 'string')
            ) {
                await this.quizQuestionBusinessLogic.updateQuizQuestion({
                    question,
                    answer,
                    idQuiz: idQuiz as IdQuiz,
                    idQuizQuestion: idQuizQuestion as IdQuizQuestion,
                    choices
                })
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async deleteQuizQuestion(req: Request) {
        try {
            const { idQuizQuestion }: QuizQuestionDeleteDto = await req.json()

            if (idQuizQuestion && typeof idQuizQuestion === 'number') {
                await this.quizQuestionBusinessLogic.deleteQuizQuestion(idQuizQuestion as IdQuizQuestion)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getQuizQuestion(req: Request) {
        try {
            const idQuizQuestion = new URL(req.url).searchParams.get('idQuizQuestion')
            const isAdmin = new URL(req.url).searchParams.get('isAdmin')

            if (idQuizQuestion) {
                const quizQuestion = await this.quizQuestionBusinessLogic.getQuizQuestion(parseInt(idQuizQuestion) as IdQuizQuestion, !!isAdmin)
                return NextResponse.json<QuizQuestion>(quizQuestion, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getQuizQuestions(req: Request) {
        try {
            const idQuiz = new URL(req.url).searchParams.get('idQuiz')
            const isAdmin = new URL(req.url).searchParams.get('isAdmin')

            if (idQuiz) {
                const quizQuestions = await this.quizQuestionBusinessLogic.getQuizQuestions(parseInt(idQuiz) as IdQuiz, !!isAdmin)
                return NextResponse.json<QuizQuestion[]>(quizQuestions, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}