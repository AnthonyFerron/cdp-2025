import getUserUrl from "@/app/helpers/getUserUrl";
import { Course } from "@/app/models/course.model";
import { ResponseApi } from "@/app/types/api.types";
import { IdCourse } from "@/app/types/custom.types";


const userUrl = getUserUrl()

export default async function getCourse(idCourse?: IdCourse): ResponseApi<Course> {
    const res = await fetch(`${userUrl}course?id=${idCourse}`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}