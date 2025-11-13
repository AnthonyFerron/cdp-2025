import getUserUrl from "@/app/helpers/getUserUrl";
import { IdUser } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function updateAchievedMission(idUser: IdUser) {
    return await fetch(`${userUrl}achieved?idUser=${idUser}`, {
        method: 'PUT'
    })
}