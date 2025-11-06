import { IdBadge, IdUser } from "../../types/custom.types";
import { Earned, EarnedDb } from "./earned.model";


export default class EarnedTransformer {
    static DbToApi(earned: EarnedDb): Earned {
        return {
            isEquiped: earned.is_equiped,
            idBadge: earned.id_badge as IdBadge,
            earnedAt: earned.earned_at,
            idUser: earned.id_user as IdUser
        }
    }
}