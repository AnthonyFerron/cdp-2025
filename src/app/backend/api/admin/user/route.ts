import UserBusinessLogic from "@/app/backend/businessLogic/userBusinessLogic";
import UserController from "@/app/backend/controller/userController";
import UserCrud from "@/app/backend/crud/userCrud";

const userCrud = new UserCrud();
const userBusinessLogic = new UserBusinessLogic(userCrud);
const userController = new UserController(userBusinessLogic);

export const GET = async () => userController.getUsers();

export const POST = async (req: Request) => userController.createUser(req);
