import getUserUrl from "@/app/helpers/getUserUrl";
import { IdQuiz, IdUser } from "@/app/types/custom.types";


type Params = {
    score: number
    passed: boolean
    startedAt: Date
    idQuiz: IdQuiz
    idUser: IdUser
}

const userUrl = getUserUrl()

export default async function getQuizAttempts(idQuiz: IdQuiz, idUser: IdUser, data: Params) {
    return await fetch(`${userUrl}quizAttempt?idQuiz=${idQuiz}?idUser=${idUser}`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}