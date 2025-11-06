import { NextResponse } from "next/server";
import QuizAttemptBusinessLogic from "../businessLogic/quizAttemptBusinessLogic";
import { QuizAttempt, QuizAttemptCreateDto } from "../models/quizAttempt/quizAttempt.model";
import { IdQuiz, IdUser } from "../types/custom.types";



export default class QuizAttemptController {

    private readonly quizAttemptBusinessLogic: QuizAttemptBusinessLogic

    constructor() {
        this.quizAttemptBusinessLogic = new QuizAttemptBusinessLogic()
    }

    async createQuizAttempt(req: Request) {
        try {
            const {
                score,
                startedAt,
                passed,
                idQuiz,
                idUser
            }: QuizAttemptCreateDto = await req.json()

            if (
                score && typeof score === 'number' &&
                idQuiz && typeof idQuiz === 'number' &&
                idUser && typeof idUser === 'string' &&
                typeof passed === 'boolean' &&
                startedAt
            ) {
                await this.quizAttemptBusinessLogic.createQuizAttempt(score, passed, startedAt as Date, idQuiz as IdQuiz, idUser as IdUser)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getQuizAttempts(req: Request) {
        try {
            const idQuiz = new URL(req.url).searchParams.get('idQuiz')
            const idUser = new URL(req.url).searchParams.get('idUser')

            if (idQuiz && idUser) {
                const quizAttempts = await this.quizAttemptBusinessLogic.getQuizAttempts(idUser as IdUser, parseInt(idQuiz) as IdQuiz)
                return NextResponse.json<QuizAttempt[]>(quizAttempts, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}