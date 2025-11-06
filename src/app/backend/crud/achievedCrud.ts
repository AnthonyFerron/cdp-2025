import CrudError from "../errors/crudError";
import { Achieved, AchievedDb } from "../models/achieved/achieved.model";
import { IdMission, IdUser } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class AchievedCrud extends ConfigCrud {

    async createAchieved(idMission: IdMission, idUser: IdUser) {
        try {
            await this.prisma.achieved.create({
                data: {
                    id_mission: idMission,
                    id_user: idUser,
                    is_completed: false
                }
            })
        } catch (err) {
            throw new CrudError('createAchieved', String(err))
        }
    }

    async updateAchieved(achieved: Achieved) {
        try {
            await this.prisma.achieved.update({
                where: {
                    id_user_id_mission: {
                        id_user: achieved.idUser,
                        id_mission: achieved.idMission
                    }
                },
                data: {
                    is_completed: achieved.isCompleted
                }
            })
        } catch (err) {
            throw new CrudError('updateAchieved', String(err))
        }
    }

    async getAchieved(idUser: IdUser, idMission: IdMission): Promise<AchievedDb | null> {
        try {
            return await this.prisma.achieved.findUnique({
                where: {
                    id_user_id_mission: {
                        id_mission: idMission,
                        id_user: idUser
                    }
                }
            })
        } catch (err) {
            throw new CrudError('updateAchieved', String(err))
        }
    }

    async getAchieveds(idUser: IdUser): Promise<AchievedDb[]> {
        try {
            return await this.prisma.achieved.findMany({
                where: {
                    id_user: idUser
                }
            })
        } catch (err) {
            throw new CrudError('updateAchieved', String(err))
        }
    }
}