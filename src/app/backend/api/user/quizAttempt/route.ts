import QuizAttemptController from "@/app/backend/controller/quizAttemptController";


const quizAttemptController = new QuizAttemptController()

export const POST = async (req: Request) => quizAttemptController.createQuizAttempt(req)
export const GET = async (req: Request) => quizAttemptController.getQuizAttempts(req)