import { IdBadge, IdMission } from "../../types/custom.types"


export type MissionDB = {
    id_mission: number
    title: string
    content: string
    target_type: string
    reward_xp: number | null
    reward_coins: number | null
    create_at: Date
    id_badge: number | null
}

export type Mission = {
    idMission: IdMission
    title: string
    content: string
    targetType: string
    rewardXp: number | null
    rewardCoins: number | null
    createAt: Date
    idBadge: IdBadge | null
}

export type MissionCreateDto = {
    title?: unknown
    content?: unknown
    targetType?: unknown
    rewardXp?: unknown
    rewardCoins?: unknown
    idBadge?: unknown
}

export type MissionDeleteDto = {
    idMission?: IdMission
}