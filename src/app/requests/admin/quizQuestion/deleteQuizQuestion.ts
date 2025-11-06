import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdQuizQuestion } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idQuizQuestion: IdQuizQuestion
}

export default async function deleteQuizQuestion(data: Params) {
    return await fetch(`${adminUrl}quizQuestion`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}