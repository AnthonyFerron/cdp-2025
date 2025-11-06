import getUserUrl from "@/app/helpers/getUserUrl"
import { ProgrammingLanguage } from "@/app/models/programmingLanguage.model"
import { ResponseApi } from "@/app/types/api.types"
import { IdLanguage } from "@/app/types/custom.types"


const userUrl = getUserUrl()

export default async function getProgrammingLanguage(idLanguage: IdLanguage): ResponseApi<ProgrammingLanguage> {
    const res = await fetch(`${userUrl}programmingLanguage?id=${idLanguage}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}