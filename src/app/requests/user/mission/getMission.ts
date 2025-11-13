import getUserUrl from "@/app/helpers/getUserUrl";
import { ResponseApi } from "@/app/types/api.types";
import { Mission } from "@prisma/client";


const userUrl = getUserUrl()

export default async function getMission(idMission?: string): ResponseApi<Mission> {
    const res = await fetch(`${userUrl}mission?id=${idMission}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}