import { NextRequest } from "next/server";
import UserCrud from "@/app/backend/crud/userCrud";
import UserBusinessLogic from "@/app/backend/businessLogic/userBusinessLogic";
import UserController from "@/app/backend/controller/userController";

const userCrud = new UserCrud();
const userBusinessLogic = new UserBusinessLogic(userCrud);
const userController = new UserController(userBusinessLogic);

export async function POST(req: NextRequest) {
  return await userController.calculateLevel(req);
}
