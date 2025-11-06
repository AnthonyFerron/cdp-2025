import BadgeBusinessLogic from "@/app/backend/businessLogic/badgeBusinessLogic";
import BadgeController from "@/app/backend/controller/badgeController";
import BadgeCrud from "@/app/backend/crud/badgeCrud";


const badgeCrud = new BadgeCrud()
const badgeBusinessLogic = new BadgeBusinessLogic(badgeCrud)
const badgeController = new BadgeController(badgeBusinessLogic)

export const GET = async (req: Request) => {
    const idBadge = new URL(req.url).searchParams.get('idBadge')

    if (idBadge) {
        return await badgeController.getBadge(req)
    } else {
        return await badgeController.getBadges(req)
    }
}