import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdCourse } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    idCourse: IdCourse
}

export default async function deleteCourse(data: Params) {
    return await fetch(`${adminUrl}course`, {
        body: JSON.stringify(data),
        method: 'DELETE'
    })
}