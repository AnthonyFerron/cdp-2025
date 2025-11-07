import EarnedCrud from "../crud/earnedCrud";
import { Earned } from "../models/earned/earned.model";
import EarnedTransformer from "../models/earned/earnedTransformer";
import { IdBadge, IdUser } from "../types/custom.types";


export default class EarnedBusinessLogic {

    private readonly earnedCrud: EarnedCrud

    constructor() {
        this.earnedCrud = new EarnedCrud()
    }

    async createEarned(idBadge: IdBadge, idUser: IdUser) {
        const badges = await this.getEarneds(idUser)
        const badge = badges.find(badge => badge.idBadge === idBadge)

        if (!badge) {
            await this.earnedCrud.createEarned(idBadge, false, idUser)
        }
    }

    async updateEarned(Earned: Omit<Earned, 'earnedAt'>) {
        await this.earnedCrud.updateEarned(Earned)
    }

    async getEarneds(idUser: IdUser): Promise<Earned[]> {
        const earnedsDb = await this.earnedCrud.getEarneds(idUser)
        return earnedsDb.map(badge => EarnedTransformer.DbToApi(badge))
    }

    async updateEquipedBadge(idUser: IdUser, isEquiped: boolean, idBadge: IdBadge) {
        const badges = await this.getEarneds(idUser)
        const badge = badges.find(badge => badge.idBadge === idBadge)

        if (badge) {
            badge.isEquiped = isEquiped
            await this.updateEarned(badge)
        }
    }
}