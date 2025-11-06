import getAdminUrl from "@/app/helpers/getAdminUrl"
import { CosmeticType } from "@/app/models/cosmetic.model"


const adminUrl = getAdminUrl()

type Params = {
    type: CosmeticType
    price: number
    isActive: boolean
    image: string
    name: string
}

export default async function createCosmetic(data: Params) {
    return await fetch(`${adminUrl}cosmetic`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}