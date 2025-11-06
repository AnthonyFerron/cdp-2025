import getUserUrl from "@/app/helpers/getUserUrl";
import { Cosmetic } from "@/app/models/cosmetic.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdCosmetic } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getCosmetic(idCosmetic: IdCosmetic): ResponseApi<Cosmetic> {
    const res = await fetch(`${userUrl}cosmetic?idCosmetic=${idCosmetic}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}