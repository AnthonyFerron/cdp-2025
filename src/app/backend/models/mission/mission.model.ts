import { IdBadge, IdMission } from "../../types/custom.types"


export type MissionDB = {
    id_mission: IdMission
    title: string
    content: string
    target_type: string
    reward_xp: number
    reward_coins: number
    create_at: string
    id_badge?: IdBadge
}

export type Mission = {
    idMission: IdMission
    title: string
    content: string
    targetType: string
    rewardXp: number
    rewardCoins: number
    createAt: string
    idBadge?: IdBadge
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