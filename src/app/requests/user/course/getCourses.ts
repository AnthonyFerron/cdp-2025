import getUserUrl from "@/app/helpers/getUserUrl";
import { Course } from "@/app/models/course.model";
import { ResponseApi } from "@/app/types/api.types";


const userUrl = getUserUrl()

export default async function getCourses(): ResponseApi<Course[]> {
    const res = await fetch(`${userUrl}course`, {
        method: 'GET'
    })

    if (res.ok) {
        return await res.json()
    }
    return null
}