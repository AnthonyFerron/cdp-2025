import getUserUrl from "@/app/helpers/getUserUrl";


const userUrl = getUserUrl()

export default async function updateAchievedMission() {
    return await fetch(`${userUrl}achieved`, {
        method: 'PUT'
    })
}