import EarnedController from "@/app/backend/controller/earnedController";


const earnedController = new EarnedController()

export const GET = async (req: Request) => earnedController.getEarneds(req)
export const PUT = async (req: Request) => earnedController.updateEarned(req)