import getUserUrl from "@/app/helpers/getUserUrl";
import { Quiz } from "@/app/models/quiz.model";
import { ResponseApi } from "@/app/types/api.types";


const userUrl = getUserUrl()

export default async function getQuizs(): ResponseApi<Quiz[]> {
    const res = await fetch(`${userUrl}quiz`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}