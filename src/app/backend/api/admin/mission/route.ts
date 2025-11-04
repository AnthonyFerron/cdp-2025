import MissionBusinessLogic from "@/app/backend/businessLogic/missionBusinessLogic";
import MissionController from "@/app/backend/controller/missionController";
import MissionCrud from "@/app/backend/crud/missionCrud";


const missionCrud = new MissionCrud()
const missionBusinessLogic = new MissionBusinessLogic(missionCrud)
const missionController = new MissionController(missionBusinessLogic)


export const POST = async (req: Request) => missionController.createMission(req)

export const DELETE = async (req: Request) => missionController.deleteMission(req)