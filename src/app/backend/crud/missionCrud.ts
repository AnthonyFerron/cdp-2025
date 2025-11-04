import CrudError from "../errors/crudError";
import { IdBadge } from "../types/custom.types";
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
}