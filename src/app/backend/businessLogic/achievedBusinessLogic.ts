import AchievedCrud from "../crud/achievedCrud";
import MissionCrud from "../crud/missionCrud";
import UserCrud from "../crud/userCrud";
import { GetAchievedBusinessLogicError } from "../errors/businessLogic/achievedBusinessLogicError";
import { Achieved } from "../models/achieved/achieved.model";
import AchievedTransformer from "../models/achieved/achievedTransformer";
import { IdMission, IdUser } from "../types/custom.types";
import MissionBusinessLogic from "./missionBusinessLogic";
import UserBusinessLogic from "./userBusinessLogic";


export default class AchievedBusinessLogic {

    private readonly achievedCrud: AchievedCrud
    private readonly userBusinessLogic: UserBusinessLogic
    private readonly missionBusinessLogic: MissionBusinessLogic

    constructor() {
        this.achievedCrud = new AchievedCrud()
        this.userBusinessLogic = new UserBusinessLogic(new UserCrud())
        this.missionBusinessLogic = new MissionBusinessLogic(new MissionCrud())
    }

    async createAchieved(idUser: IdUser, idMission: IdMission) {
        await this.achievedCrud.createAchieved(idMission, idUser)
    }

    async updateAchieved(achieved: Achieved) {
        await this.achievedCrud.updateAchieved(achieved)

        if (achieved.isCompleted) {
            await this.userBusinessLogic.missionCompleted(achieved.idUser, achieved.idMission)
        }
    }

    async getAchieved(idUser: IdUser, idMission: IdMission): Promise<Achieved> {
        const achievedDb = await this.achievedCrud.getAchieved(idUser, idMission)
        if (achievedDb) {
            return AchievedTransformer.DbToApi(achievedDb)
        }
        throw new GetAchievedBusinessLogicError()
    }

    async getAchieveds(idUser: IdUser): Promise<Achieved[]> {
        const achieveds = await this.achievedCrud.getAchieveds(idUser)
        return achieveds.map(achieved => AchievedTransformer.DbToApi(achieved))
    }

    // !!!!!!!!!! Attache toutes les missions a l'utilisateur
    async attachMissionsOnUser(idUser: IdUser) {
        const missions = await this.missionBusinessLogic.getMissions()
        for (let mission of missions) {
            await this.createAchieved(idUser, mission.idMission)
        }
    }
}