import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourse, IdCourseSection, IdLanguage } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idCourseSection: IdCourseSection
    orderBy: number
    title: string
    content: string
    image: string
    idCourse: IdCourse
}

export default async function updateCourseSection(data: Params) {
    return await fetch(`${adminUrl}courseSection`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}