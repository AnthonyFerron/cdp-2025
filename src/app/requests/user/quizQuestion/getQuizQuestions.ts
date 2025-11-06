import getUserUrl from "@/app/helpers/getUserUrl";
import { QuizQuestion } from "@/app/models/quizQuestion.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdQuiz } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getQuizQuestions(idQuiz: IdQuiz, withResponse: boolean): ResponseApi<QuizQuestion[]> {
    const res = await fetch(`${userUrl}quizQuestion?idQuiz=${idQuiz}${withResponse ? 'isAdmin=1' : ''}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}