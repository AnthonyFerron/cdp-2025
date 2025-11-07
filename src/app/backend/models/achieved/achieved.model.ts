import { IdMission, IdUser } from "../../types/custom.types"


export type AchievedDb = {
    id_mission: number
    id_user: string
    is_completed: boolean
}

export type Achieved = {
    idMission: IdMission
    idUser: IdUser
    isCompleted: boolean
}