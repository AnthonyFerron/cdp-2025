import MissionCrud from "../crud/missionCrud";
import { IdBadge, IdMission } from "../types/custom.types";
import MissionTransformer from "../models/mission/missionTransformer";
import { GetMissionWithIdBusinessLogicError } from "../errors/businessLogic/missionBusinessLogicError";
import { Mission } from "../models/mission/mission.model";


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

    async getMissionWithId(idMission: IdMission): Promise<Mission> {
        const missionDb = await this.missionCrud.getMissionWithId(idMission)
        if (missionDb) {
            return MissionTransformer.DbToApi(missionDb)
        }
        throw new GetMissionWithIdBusinessLogicError()
    }

    async getMissions(): Promise<Mission[]> {
        const missionsDb = await this.missionCrud.getMissions()
        return missionsDb.map(mission => MissionTransformer.DbToApi(mission))
    }
}