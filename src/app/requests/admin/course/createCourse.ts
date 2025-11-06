import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdLanguage } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    title: string
    slug: string
    difficulty: number
    isPublished: boolean
    estimatedTime: number
    idLanguage: IdLanguage
}

export default async function createCourse(data: Params) {
    return await fetch(`${adminUrl}course`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}