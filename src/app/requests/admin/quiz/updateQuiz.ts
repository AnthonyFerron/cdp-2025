import getAdminUrl from "@/app/helpers/getAdminUrl"
import { Quiz } from "@/app/models/quiz.model"


const adminUrl = getAdminUrl()

export default async function updateQuiz(data: Quiz) {
    return await fetch(`${adminUrl}quiz`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}