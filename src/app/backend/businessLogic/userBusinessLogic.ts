import UserCrud from "../crud/userCrud";
import { IdCountry, IdUser } from "../types/custom.types";
import UserTransformer from "../models/user/userTransformer";
import { GetUserWithIdBusinessLogicError } from "../errors/businessLogic/userBusinessLogicError";
import { User } from "../models/user/user.model";

export default class UserBusinessLogic {
  constructor(private readonly userCrud: UserCrud) {}

  async createUser(
    id: IdUser,
    name: string,
    email: string,
    emailVerified: boolean,
    experience: number,
    levels: number,
    coins: number,
    role: string,
    idCountry: IdCountry
  ) {
    await this.userCrud.createUser(
      id,
      name,
      email,
      emailVerified,
      experience,
      levels,
      coins,
      role,
      idCountry
    );
  }

  async updateUser(
    id: IdUser,
    name: string,
    email: string,
    emailVerified: boolean,
    experience: number,
    levels: number,
    coins: number,
    role: string,
    idCountry: IdCountry
  ) {
    await this.userCrud.updateUser(
      id,
      name,
      email,
      emailVerified,
      experience,
      levels,
      coins,
      role,
      idCountry
    );
  }

  async deleteUser(id: IdUser) {
    await this.userCrud.deleteUser(id);
  }

  async getUserWithId(id: IdUser): Promise<User> {
    const userDb = await this.userCrud.getUserWithId(id);
    if (userDb) {
      return UserTransformer.DbToApi(userDb);
    }
    throw new GetUserWithIdBusinessLogicError();
  }

  async getUsers(): Promise<User[]> {
    const usersDb = await this.userCrud.getUsers();
    return usersDb.map((user) => UserTransformer.DbToApi(user));
  }
}
