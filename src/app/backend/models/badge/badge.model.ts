import { IdBadge } from "../../types/custom.types"


export type BadgeDb = {
    id_badge: number
    name: string
    icon: string
}

export type Badge = {
    idBadge: IdBadge
    name: string
    icon: string
}

export type BadgeCreateDto = {
    name?: unknown
    icon?: unknown
}

export type BadgeUpdateDto = {
    idBadge?: unknown
    name?: unknown
    icon?: unknown
}

export type BadgeDeleteDto = {
    idBadge?: unknown
}