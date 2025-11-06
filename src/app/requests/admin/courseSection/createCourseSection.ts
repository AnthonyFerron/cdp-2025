import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourse, IdLanguage } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    orderBy: number
    title: string
    content: string
    idCourse: IdCourse
    image: string
}

export default async function createCourseSection(data: Params) {
    return await fetch(`${adminUrl}courseSection`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}