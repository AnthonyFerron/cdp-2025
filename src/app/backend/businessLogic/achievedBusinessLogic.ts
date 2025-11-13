import AchievedCrud from "../crud/achievedCrud";
import MissionCrud from "../crud/missionCrud";
import { GetAchievedBusinessLogicError } from "../errors/businessLogic/achievedBusinessLogicError";
import { Achieved } from "../models/achieved/achieved.model";
import AchievedTransformer from "../models/achieved/achievedTransformer";
import { IdMission, IdUser } from "../types/custom.types";
import MissionBusinessLogic from "./missionBusinessLogic";



export default class AchievedBusinessLogic {

    private readonly achievedCrud: AchievedCrud
    private readonly missionBusinessLogic: MissionBusinessLogic

    constructor() {
        this.achievedCrud = new AchievedCrud()
        this.missionBusinessLogic = new MissionBusinessLogic(new MissionCrud())
    }

    async createAchieved(idUser: IdUser, idMission: IdMission) {
        await this.achievedCrud.createAchieved(idMission, idUser)
    }

    async updateAchieved(achieved: Achieved) {
        await this.achievedCrud.updateAchieved(achieved)

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