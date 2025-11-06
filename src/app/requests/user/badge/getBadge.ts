import getUserUrl from "@/app/helpers/getUserUrl";
import { Badge } from "@/app/models/badge.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdBadge } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getBadge(idBadge: IdBadge): ResponseApi<Badge> {
    const res = await fetch(`${userUrl}badge?idBadge=${idBadge}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}