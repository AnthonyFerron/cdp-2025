import { IdMission, IdUser } from "../../types/custom.types";
import { Achieved, AchievedDb } from "./achieved.model";


export default class AchievedTransformer {
    static DbToApi(achieved: AchievedDb): Achieved {
        return {
            idMission: achieved.id_mission as IdMission,
            idUser: achieved.id_user as IdUser,
            isCompleted: achieved.is_completed
        }
    }
}