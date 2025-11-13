import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourse, IdLanguage } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    title: string
    slug: string
    difficulty: number
    isPublished: boolean
    estimatedTime: number
    idLanguage: IdLanguage
    idCourse: IdCourse
}

export default async function updateCourse(data: Params) {
    return await fetch(`${adminUrl}course`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}