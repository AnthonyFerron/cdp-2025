import UserBusinessLogic from "@/app/backend/businessLogic/userBusinessLogic";
import UserController from "@/app/backend/controller/userController";
import UserCrud from "@/app/backend/crud/userCrud";

const userCrud = new UserCrud();
const userBusinessLogic = new UserBusinessLogic(userCrud);
const userController = new UserController(userBusinessLogic);

export const GET = async (req: Request) => userController.getUserWithId(req);

export const PUT = async (req: Request) => userController.updateUser(req);

export const DELETE = async (req: Request) => userController.deleteUser(req);
