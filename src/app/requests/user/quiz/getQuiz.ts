import getUserUrl from "@/app/helpers/getUserUrl";
import { Quiz } from "@/app/models/quiz.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdQuiz } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getQuiz(idQuiz: IdQuiz): ResponseApi<Quiz> {
    const res = await fetch(`${userUrl}quiz?idQuiz=${idQuiz}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}