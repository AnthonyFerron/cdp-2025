import CrudError from "../errors/crudError";
import { Badge, BadgeDb } from "../models/badge/badge.model";
import { IdBadge } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class BadgeCrud extends ConfigCrud {

    async createBadge(name: string, icon: string) {
        try {
            await this.prisma.badge.create({
                data: {
                    name,
                    icon
                }
            })
        } catch (err) {
            throw new CrudError('createBadge', String(err))
        }
    }

    async updateBadge(badge: Badge) {
        try {
            await this.prisma.badge.update({
                where: {
                    id_badge: badge.idBadge
                },
                data: {
                    name: badge.name,
                    icon: badge.icon
                }
            })
        } catch (err) {
            throw new CrudError('updateBadge', String(err))
        }
    }

    async deleteBadge(idBadge: IdBadge) {
        try {
            await this.prisma.badge.delete({
                where: {
                    id_badge: idBadge
                }
            })
        } catch (err) {
            throw new CrudError('deleteBadge', String(err))
        }
    }

    async getBadge(idBadge: IdBadge): Promise<BadgeDb | null> {
        try {
            return await this.prisma.badge.findUnique({
                where: {
                    id_badge: idBadge
                }
            })
        } catch (err) {
            throw new CrudError('getBadge', String(err))
        }
    }

    async getBadges(): Promise<BadgeDb[]> {
        try {
            return await this.prisma.badge.findMany()
        } catch (err) {
            throw new CrudError('getBadges', String(err))
        }
    }
}