import getUserUrl from "@/app/helpers/getUserUrl";
import { Achieved } from "@/app/models/achieved.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdUser } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getAchievedMissions(idUser: IdUser): ResponseApi<Achieved[]> {
    const res = await fetch(`${userUrl}achieved?idUser=${idUser}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}