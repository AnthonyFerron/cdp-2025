import { IdBadge, IdUser } from "../types/custom.types"


export type Earned = {
    idBadge: IdBadge
    isEquiped: boolean
    earnedAt: Date
    idUser: IdUser
}