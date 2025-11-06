import CosmeticBusinessLogic from "@/app/backend/businessLogic/cosmeticBusinessLogic";
import CosmeticController from "@/app/backend/controller/cosmeticController";
import CosmeticCrud from "@/app/backend/crud/cosmeticCrud";


const cosmeticCrud = new CosmeticCrud()
const cosmeticBusinessLogic = new CosmeticBusinessLogic(cosmeticCrud)
const cosmeticController = new CosmeticController(cosmeticBusinessLogic)

export const GET = async (req: Request) => {
    const idCosmetic = new URL(req.url).searchParams.get('idCosmetic')

    if (idCosmetic) {
        return await cosmeticController.getCosmetic(req)
    } else {
        return await cosmeticController.getCosmetics(req)
    }
}