import { IdMission, IdUser } from "../types/custom.types"


export type Achieved = {
    idMission: IdMission
    idUser: IdUser
    isCompleted: boolean
}