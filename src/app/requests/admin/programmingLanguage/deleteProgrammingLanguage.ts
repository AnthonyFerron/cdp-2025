import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdLanguage } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idLanguage: IdLanguage
}

export default async function deleteProgrammingLanguage(data: Params) {
    return await fetch(`${adminUrl}programmingLanguage`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}