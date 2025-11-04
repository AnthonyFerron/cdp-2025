import CrudError from "../errors/crudError";
import { IdBadge, IdMission } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class MissionCrud extends ConfigCrud {

    async createMission(
        title: string,
        content: string,
        rewardCoins: number,
        rewardXp: number,
        targetType: string,
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
                    id_badge: idBadge
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
}