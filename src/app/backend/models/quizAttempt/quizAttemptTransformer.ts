import { IdQuiz, IdQuizAttempt, IdUser } from "../../types/custom.types";
import { QuizAttempt, QuizAttemptDb } from "./quizAttempt.model";


export default class QuizAttemptTransformer {
    static DbToApi(quizAttempt: QuizAttemptDb): QuizAttempt {
        return {
            idQuiz: quizAttempt.id_quiz as IdQuiz,
            idQuizAttempt: quizAttempt.id_quiz_attempt as IdQuizAttempt,
            idUser: quizAttempt.id_user as IdUser,
            score: quizAttempt.score,
            passed: quizAttempt.passed,
            startedAt: quizAttempt.started_at,
            completedAt: quizAttempt.completed_at
        }
    }
}