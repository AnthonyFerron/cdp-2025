import getUserUrl from "@/app/helpers/getUserUrl";
import { Earned } from "@/app/models/earned.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdUser } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getEarnedBadge(idUser: IdUser): ResponseApi<Earned[]> {
    const res = await fetch(`${userUrl}earned?idUser=${idUser}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}