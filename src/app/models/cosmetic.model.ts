import { IdCosmetic } from "../types/custom.types"


export type CosmeticType = 'AVATAR' | 'BANNER'

export type Cosmetic = {
    idCosmetic: IdCosmetic
    type: CosmeticType
    price: number
    isActive: boolean
    image: string
    name: string
}