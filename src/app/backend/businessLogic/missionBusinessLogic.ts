import MissionCrud from "../crud/missionCrud";
import { IdBadge, IdMission } from "../types/custom.types";


export default class MissionBusinessLogic {

    constructor(
        private readonly missionCrud: MissionCrud
    ) {}

    async createMission(title: string, content: string, rewardCoins: number, rewardXp: number, targetType: string, idBadge?: IdBadge | unknown) {
        await this.missionCrud.createMission(
            title,
            content,
            rewardCoins,
            rewardXp,
            targetType,
            (idBadge && typeof idBadge === 'number') ? idBadge as IdBadge : undefined
        )
    }

    async deleteMission(idMission: IdMission) {
        await this.missionCrud.deleteMission(idMission)
    }
}