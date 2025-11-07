import getAdminUrl from "@/app/helpers/getAdminUrl"
import { Badge } from "@/app/models/badge.model"


const adminUrl = getAdminUrl()

export default async function updateBadge(data: Badge) {
    return await fetch(`${adminUrl}badge`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}