import { NextResponse } from "next/server";
import QuizBusinessLogic from "../businessLogic/quizBusinessLogic";
import { Quiz, QuizCreateDto, QuizDeleteDto, QuizUpdateDto } from "../models/quiz/quiz.model";
import { IdCourse, IdQuiz } from "../types/custom.types";


export default class QuizController {

    constructor(
        private readonly quizBusinessLogic: QuizBusinessLogic
    ) {}

    async createQuiz(req: Request) {
        try {
            const {
                difficulty,
                idCourse,
                timeLimit
            }: QuizCreateDto = await req.json()

            if (
                difficulty && typeof difficulty === 'number' &&
                idCourse && typeof idCourse === 'number' &&
                timeLimit && typeof timeLimit === 'number'
            ) {
                await this.quizBusinessLogic.createQuiz(difficulty, timeLimit, idCourse as IdCourse)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async deleteQuiz(req: Request) {
        try {
            const { idQuiz }: QuizDeleteDto = await req.json()

            if (idQuiz && typeof idQuiz === 'number') {
                await this.quizBusinessLogic.deleteQuiz(idQuiz as IdQuiz)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateQuiz(req: Request) {
        try {
            const {
                difficulty,
                idCourse,
                timeLimit,
                idQuiz,
            }: QuizUpdateDto = await req.json()

            if (
                difficulty && typeof difficulty === 'number' &&
                idCourse && typeof idCourse === 'number' &&
                idQuiz && typeof idQuiz === 'number' &&
                timeLimit && typeof timeLimit === 'number'
            ) {
                await this.quizBusinessLogic.updateQuiz({
                    difficulty,
                    timeLimit,
                    idCourse: idCourse as IdCourse,
                    idQuiz: idQuiz as IdQuiz
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

    async getQuizWithIdQuiz(req: Request) {
        try {
            const idQuiz = new URL(req.url).searchParams.get('idQuiz')
            if (idQuiz) {
                const quiz = await this.quizBusinessLogic.getQuizWithIdQuiz(parseInt(idQuiz) as IdQuiz)
                return NextResponse.json<Quiz>(quiz, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getQuizWithIdCourse(req: Request) {
        try {
            const idCourse = new URL(req.url).searchParams.get('idCourse')
            if (idCourse) {
                const quiz = await this.quizBusinessLogic.getQuizWithIdCourse(parseInt(idCourse) as IdCourse)
                return NextResponse.json<Quiz>(quiz, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getQuizs(req: Request) {
        try {
            const quizs = await this.quizBusinessLogic.getQuizs()
            return NextResponse.json<Quiz[]>(quizs, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}