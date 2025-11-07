import getAdminUrl from "@/app/helpers/getAdminUrl"


const adminUrl = getAdminUrl()

type Params = {
    icon: string
    name: string
}

export default async function createBadge(data: Params) {
    return await fetch(`${adminUrl}badge`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}