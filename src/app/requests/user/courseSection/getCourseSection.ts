import getUserUrl from "@/app/helpers/getUserUrl";
import { CourseSection } from "@/app/models/courseSection.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdCourseSection } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getCourseSection(idCourseSection?: IdCourseSection): ResponseApi<CourseSection> {
    const res = await fetch(`${userUrl}courseSection?idCourseSection=${idCourseSection}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}