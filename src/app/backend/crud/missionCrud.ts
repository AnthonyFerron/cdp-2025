import CrudError from "../errors/crudError";
import { MissionDB } from "../models/mission/mission.model";
import { IdBadge, IdCourse, IdMission } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class MissionCrud extends ConfigCrud {

    async createMission(
        title: string,
        content: string,
        rewardCoins: number,
        rewardXp: number,
        targetType: string,
        idCourse: IdCourse,
        idBadge?: IdBadge
    ) {
        try {
            await this.prisma.mission.create({
                data: {
                    title,
                    content,
                    reward_coins: rewardCoins,
                    reward_xp: rewardXp,
                    target_type: targetType,
                    id_badge: idBadge,
                    id_course: idCourse
                }
            })
        } catch (err) {
            throw new CrudError('createMission', String(err))
        }
    }

    async deleteMission(idMission: IdMission) {
        try {
            await this.prisma.mission.delete({
                where: {
                    id_mission: idMission
                }
            })
        } catch (err) {
            throw new CrudError('deleteMission', String(err))
        }
    }

    async getMissionWithId(idMission: IdMission): Promise<MissionDB | null> {
        try {
            return await this.prisma.mission.findUnique({
                where: {
                    id_mission: idMission
                }
            })
        } catch (err) {
            throw new CrudError('getMissionWithId', String(err))
        }
    }

    async getMissions(): Promise<MissionDB[]> {
        try {
            return await this.prisma.mission.findMany()
        } catch (err) {
            throw new CrudError('getMissions', String(err))
        }
    }
}