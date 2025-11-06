import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCosmetic } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idCosmetic: IdCosmetic
}

export default async function deleteCosmetic(data: Params) {
    return await fetch(`${adminUrl}cosmetic`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}