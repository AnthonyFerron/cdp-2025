import { IdQuiz, IdQuizQuestion } from "../../types/custom.types";
import { QuizQuestion, QuizQuestionDb } from "./quizQuestion.model";


export default class QuizQuestionTransformer {
    static DbToApi(quizQuestion: QuizQuestionDb): QuizQuestion {
        return {
            idQuiz: quizQuestion.id_quiz as IdQuiz,
            idQuizQuestion: quizQuestion.id_quiz_question as IdQuizQuestion,
            question: quizQuestion.question,
            choices: JSON.parse(quizQuestion.choices),
            answer: JSON.parse(quizQuestion.answer)
        }
    }
}