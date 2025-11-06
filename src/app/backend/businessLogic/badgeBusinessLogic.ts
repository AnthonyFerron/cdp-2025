import BadgeCrud from "../crud/badgeCrud";
import { GetBadgeBusinessLogicError } from "../errors/businessLogic/badgeBusinessLogicError";
import { Badge } from "../models/badge/badge.model";
import BadgeTransformer from "../models/badge/badgeTransformer";
import { IdBadge } from "../types/custom.types";


export default class BadgeBusinessLogic {

    constructor(
        private readonly badgeCrud: BadgeCrud
    ) {}

    async createBagde(name: string, icon: string) {
        await this.badgeCrud.createBadge(name, icon)
    }

    async updateBadge(bagde: Badge) {
        await this.badgeCrud.updateBadge(bagde)
    }

    async deleteBadge(idBadge: IdBadge) {
        await this.badgeCrud.deleteBadge(idBadge)
    }

    async getBagde(idBadge: IdBadge): Promise<Badge> {
        const badgeDb = await this.badgeCrud.getBadge(idBadge)
        if (badgeDb) {
            return BadgeTransformer.DbToApi(badgeDb)
        }
        throw new GetBadgeBusinessLogicError()
    }

    async getBagdes(): Promise<Badge[]> {
        const badgesDb = await this.badgeCrud.getBadges()
        return badgesDb.map(badge => BadgeTransformer.DbToApi(badge))
    }
}