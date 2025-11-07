import getUserUrl from "@/app/helpers/getUserUrl";
import { Quiz } from "@/app/models/quiz.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdCourse } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getQuizWithIdCourse(idCourse: IdCourse): ResponseApi<Quiz> {
    const res = await fetch(`${userUrl}quiz?idCourse=${idCourse}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}