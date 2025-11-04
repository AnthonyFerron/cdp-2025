import getAdminUrl from "@/app/helpers/getAdminUrl"


const adminUrl = getAdminUrl()

type Params = {
    title: string
    content: string
    rewardCoins: number
    rewardXp: number
    targetType: string
    idBadge?: number
}

export default async function createMission(data: Params) {
    return await fetch(`${adminUrl}mission`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}