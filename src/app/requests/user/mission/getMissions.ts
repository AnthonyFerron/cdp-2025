import getUserUrl from "@/app/helpers/getUserUrl";
import { ResponseApi } from "@/app/types/api.types";
import { Mission } from "@prisma/client";


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