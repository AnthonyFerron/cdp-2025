import AchievedController from "@/app/backend/controller/achievedController"


const achievedController = new AchievedController()

export const GET = async (req: Request) => achievedController.getAchieveds(req)