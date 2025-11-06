import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdQuiz } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idQuiz: IdQuiz
}

export default async function deleteQuiz(data: Params) {
    return await fetch(`${adminUrl}quiz`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}