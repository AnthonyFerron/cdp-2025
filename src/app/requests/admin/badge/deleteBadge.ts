import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdBadge } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idBadge: IdBadge
}

export default async function deleteBadge(data: Params) {
    return await fetch(`${adminUrl}badge`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}