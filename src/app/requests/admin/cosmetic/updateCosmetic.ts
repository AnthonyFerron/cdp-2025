import getAdminUrl from "@/app/helpers/getAdminUrl"
import { Cosmetic } from "@/app/models/cosmetic.model"


const adminUrl = getAdminUrl()

export default async function updateCosmetic(data: Cosmetic) {
    return await fetch(`${adminUrl}cosmetic`, {
        body: JSON.stringify(data),
        method: 'PUT'
    })
}