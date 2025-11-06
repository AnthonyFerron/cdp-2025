import getUserUrl from "@/app/helpers/getUserUrl";
import { QuizAttempt } from "@/app/models/quizAttempt.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdQuiz, IdUser } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getQuizAttempts(idQuiz: IdQuiz, idUser: IdUser): ResponseApi<QuizAttempt[]> {
    const res = await fetch(`${userUrl}quizAttempt?idQuiz=${idQuiz}?idUser=${idUser}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}