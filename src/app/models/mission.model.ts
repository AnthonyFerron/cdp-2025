import { IdBadge, IdMission } from "../types/custom.types"


export type Mission = {
    idMission: IdMission
    title: string
    content: string
    targetType: string
    rewardXp: number | null
    rewardCoins: number | null
    createAt: string
    idBadge: IdBadge | null
}
