import BadgeBusinessLogic from "@/app/backend/businessLogic/badgeBusinessLogic";
import BadgeController from "@/app/backend/controller/badgeController";
import BadgeCrud from "@/app/backend/crud/badgeCrud";


const badgeCrud = new BadgeCrud()
const badgeBusinessLogic = new BadgeBusinessLogic(badgeCrud)
const badgeController = new BadgeController(badgeBusinessLogic)

export const POST = async (req: Request) => badgeController.createBadge(req)
export const PUT = async (req: Request) => badgeController.updateBadge(req)
export const DELETE = async (req: Request) => badgeController.deleteBadge(req)