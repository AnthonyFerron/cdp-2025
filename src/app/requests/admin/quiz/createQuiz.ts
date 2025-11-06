import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourse } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    difficulty: number
    timeLimit: number
    idCourse: IdCourse
}

export default async function createQuiz(data: Params) {
    return await fetch(`${adminUrl}quiz`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}