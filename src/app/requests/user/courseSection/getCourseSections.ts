import getUserUrl from "@/app/helpers/getUserUrl";
import { CourseSection } from "@/app/models/courseSection.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdCourse } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getCourseSections(idCourse: IdCourse): ResponseApi<CourseSection[]> {
    const res = await fetch(`${userUrl}courseSection?idCourse=${idCourse}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}