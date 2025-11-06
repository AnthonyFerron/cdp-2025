import getAdminUrl from "@/app/helpers/getAdminUrl"


const adminUrl = getAdminUrl()

type Params = {
    name: string
    isPublic: boolean
}

export default async function createProgrammingLanguage(data: Params) {
    return await fetch(`${adminUrl}programmingLanguage`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}