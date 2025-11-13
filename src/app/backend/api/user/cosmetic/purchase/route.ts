import OwnedBusinessLogic from "@/app/backend/businessLogic/ownedBusinessLogic";
import OwnedController from "@/app/backend/controller/ownedController";
import CosmeticCrud from "@/app/backend/crud/cosmeticCrud";
import OwnedCrud from "@/app/backend/crud/ownedCrud";
import UserCrud from "@/app/backend/crud/userCrud";

const ownedCrud = new OwnedCrud();
const userCrud = new UserCrud();
const cosmeticCrud = new CosmeticCrud();
const ownedBusinessLogic = new OwnedBusinessLogic(
  ownedCrud,
  userCrud,
  cosmeticCrud
);
const ownedController = new OwnedController(ownedBusinessLogic);

export const POST = async (req: Request) => {
  return await ownedController.purchaseCosmetic(req);
};
