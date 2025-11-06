import { IdBadge } from "../../types/custom.types";
import { Badge, BadgeDb } from "./badge.model";


export default class BadgeTransformer {
    static DbToApi(badge: BadgeDb): Badge {
        return {
            icon: badge.icon,
            idBadge: badge.id_badge as IdBadge,
            name: badge.name
        }
    }
}