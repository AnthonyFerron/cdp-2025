import getUserUrl from "@/app/helpers/getUserUrl";
import { Badge } from "@/app/models/badge.model";
import { ResponseApi } from "@/app/types/api.types";


const userUrl = getUserUrl()

export default async function getBadges(): ResponseApi<Badge[]> {
    const res = await fetch(`${userUrl}badge`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}