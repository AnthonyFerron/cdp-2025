import getAdminUrl from "@/app/helpers/getAdminUrl"


const adminUrl = getAdminUrl()

type Params = {
    idMission: number
}

export default async function deleteMission(data: Params) {
    return await fetch(`${adminUrl}mission`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}