import getUserUrl from "@/app/helpers/getUserUrl";
import { Cosmetic } from "@/app/models/cosmetic.model";
import { ResponseApi } from "@/app/types/api.types";


const userUrl = getUserUrl()

export default async function getCosmetics(): ResponseApi<Cosmetic[]> {
    const res = await fetch(`${userUrl}cosmetic`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}