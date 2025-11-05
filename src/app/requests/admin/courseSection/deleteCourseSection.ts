import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourseSection } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idCourseSection: IdCourseSection
}

export default async function deleteCourseSection(data: Params) {
    return await fetch(`${adminUrl}courseSection`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}