import getUserUrl from "@/app/helpers/getUserUrl";
import { QuizQuestion } from "@/app/models/quizQuestion.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdQuizQuestion } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getQuizQuestion(
    idQuizQuestion: IdQuizQuestion,
    withResponse: boolean
): ResponseApi<QuizQuestion> {
    const queryParams = new URLSearchParams({
        idQuizQuestion: String(idQuizQuestion),
        ...(withResponse ? { isAdmin: "1" } : {})
    });

    const res = await fetch(`${userUrl}quizQuestion?${queryParams.toString()}`, {
        method: "GET"
    });

    if (res.ok) {
        return await res.json();
    }
    return null;
}