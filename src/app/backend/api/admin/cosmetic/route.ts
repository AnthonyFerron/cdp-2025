import CosmeticBusinessLogic from "@/app/backend/businessLogic/cosmeticBusinessLogic";
import CosmeticController from "@/app/backend/controller/cosmeticController";
import CosmeticCrud from "@/app/backend/crud/cosmeticCrud";


const cosmeticCrud = new CosmeticCrud()
const cosmeticBusinessLogic = new CosmeticBusinessLogic(cosmeticCrud)
const cosmeticController = new CosmeticController(cosmeticBusinessLogic)

export const POST = async (req: Request) => cosmeticController.createCosmetic(req)
export const PUT = async (req: Request) => cosmeticController.updateCosmetic(req)
export const DELETE = async (req: Request) => cosmeticController.deleteCosmetic(req)