import getAdminUrl from "@/app/helpers/getAdminUrl"
import { QuizQuestion } from "@/app/models/quizQuestion.model"


const adminUrl = getAdminUrl()

export default async function updateQuizQuestion(data: QuizQuestion) {
    return await fetch(`${adminUrl}quizQuestion`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}