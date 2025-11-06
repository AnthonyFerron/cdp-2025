import MissionBusinessLogic from "@/app/backend/businessLogic/missionBusinessLogic"
import MissionController from "@/app/backend/controller/missionController"
import MissionCrud from "@/app/backend/crud/missionCrud"


const missionCrud = new MissionCrud()
const missionBusinessLogic = new MissionBusinessLogic(missionCrud)
const missionController = new MissionController(missionBusinessLogic)

export const GET = async (req: Request) => {
    const id = new URL(req.url).searchParams.get('id')
    if (id) {
        return await missionController.getMissionWithId(req)
    }
    return await missionController.getMissions(req)
}