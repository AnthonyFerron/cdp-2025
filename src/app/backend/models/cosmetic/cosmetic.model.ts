import { IdCosmetic } from "../../types/custom.types"


export type CosmeticType = 'AVATAR' | 'BANNER'

export type CosmeticDb = {
    id_cosmetic: number
    type: string
    price: number
    is_active: boolean
    image: string
    name: string
}

export type Cosmetic = {
    idCosmetic: IdCosmetic
    type: CosmeticType
    price: number
    isActive: boolean
    image: string
    name: string
}

export type CosmeticCreateDto = {
    type?: unknown
    price?: unknown
    isActive?: unknown
    image?: unknown
    name?: unknown
}

export type CosmeticDeleteDto = {
    idCosmetic?: unknown
}

export type CosmeticUpdateDto = {
    idCosmetic?: unknown
    type?: unknown
    price?: unknown
    isActive?: unknown
    image?: unknown
    name?: unknown
}