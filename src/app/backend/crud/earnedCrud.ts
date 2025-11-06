import CrudError from "../errors/crudError";
import { Earned, EarnedDb } from "../models/earned/earned.model";
import { IdBadge, IdUser } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class EarnedCrud extends ConfigCrud {

    async createEarned(idbadge: IdBadge, isEquiped: boolean, idUser: IdUser) {
        try {
            await this.prisma.earned.create({
                data: {
                    id_badge: idbadge,
                    is_equiped: isEquiped,
                    id_user: idUser,
                    earned_at: new Date()
                }
            })
        } catch (err) {
            throw new CrudError('createEarned', String(err))
        }
    }

    async updateEarned(earned: Earned) {
        try {
            await this.prisma.earned.update({
                where: {
                    id_user_id_badge: {
                        id_user: earned.idUser,
                        id_badge: earned.idBadge
                    }
                },
                data: {
                    is_equiped: earned.isEquiped,
                }
            })
        } catch (err) {
            throw new CrudError('createEarned', String(err))
        }
    }

    async getEarneds(idUser: IdUser): Promise<EarnedDb[]> {
        try {
            return await this.prisma.earned.findMany({
                where: {
                    id_user: idUser
                }
            })
        } catch (err) {
            throw new CrudError('createEarned', String(err))
        }
    }
}