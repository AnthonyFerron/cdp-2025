import getUserUrl from "@/app/helpers/getUserUrl";
import { Mission } from "@/app/models/mission.model";
import { ResponseApi } from "@/app/types/api.types";


const userUrl = getUserUrl()

export default async function getMissions(): ResponseApi<Mission[]> {
    const res = await fetch(`${userUrl}mission`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}