import { IdCourse, IdQuiz } from "../../types/custom.types";
import { Quiz, QuizDb } from "./quiz.model";


export default class QuizTransformer {
    static DbToApi(data: QuizDb): Quiz {
        return {
            idCourse: data.id_course as IdCourse,
            idQuiz: data.id_quiz as IdQuiz,
            difficulty: data.difficulty,
            timeLimit: data.time_limit
        }
    }
}