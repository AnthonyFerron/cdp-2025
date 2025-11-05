import getUserUrl from "@/app/helpers/getUserUrl"
import { ProgrammingLanguage } from "@/app/models/programmingLanguage.model"
import { ResponseApi } from "@/app/types/api.types"


const userUrl = getUserUrl()

export default async function getProgrammingLanguages(): ResponseApi<ProgrammingLanguage[]> {
    const res = await fetch(`${userUrl}programmingLanguage`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}