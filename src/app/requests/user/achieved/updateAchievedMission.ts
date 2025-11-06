import getUserUrl from "@/app/helpers/getUserUrl";
import { Achieved } from "@/app/models/achieved.model";


const userUrl = getUserUrl()

export default async function updateAchievedMission(data: Achieved) {
    return await fetch(`${userUrl}achieved`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
}