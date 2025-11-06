import { IdBadge, IdUser } from "../../types/custom.types"


export type EarnedDb = {
    id_badge: number
    is_equiped: boolean
    earned_at: Date
    id_user: string
}

export type Earned = {
    idBadge: IdBadge
    isEquiped: boolean
    earnedAt: Date
    idUser: IdUser
}

export type EarnedUpdateDto = {
    idBadge?: unknown
    isEquiped?: unknown
    idUser?: unknown
}