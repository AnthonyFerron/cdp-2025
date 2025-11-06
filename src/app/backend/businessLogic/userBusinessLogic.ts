import UserCrud from "../crud/userCrud";
import { IdCountry, IdUser } from "../types/custom.types";
import UserTransformer from "../models/user/userTransformer";
import { GetUserWithIdBusinessLogicError } from "../errors/businessLogic/userBusinessLogicError";
import { User } from "../models/user/user.model";
import UserLevelCalculator from "../services/userLevelCalculator";

export default class UserBusinessLogic {
  private readonly levelCalculator: UserLevelCalculator;

  constructor(private readonly userCrud: UserCrud) {
    this.levelCalculator = new UserLevelCalculator();
  }

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

  async addCoinsToUser(id: IdUser, coinsToAdd: number) {
    await this.userCrud.addCoinsToUser(id, coinsToAdd);
  }

  async addExperienceToUser(id: IdUser, experienceToAdd: number) {
    await this.userCrud.addExperienceToUser(id, experienceToAdd);
  }

  async calculateAndUpdateLevel(id: IdUser): Promise<{
    hasLeveledUp: boolean;
    newLevel: number;
    levelsGained: number;
    xpForNextLevel: number;
    xpProgress: number;
    xpNeededForNextLevel: number;
    progressPercentage: number;
  }> {
    // Récupérer l'utilisateur
    const user = await this.getUserWithId(id);

    // Calculer le niveau basé sur l'XP
    const levelInfo = this.levelCalculator.checkLevelUp(
      user.levels,
      user.experience
    );

    // Si level up, mettre à jour le niveau en base
    if (levelInfo.hasLeveledUp) {
      await this.userCrud.updateUserLevel(id, levelInfo.newLevel);
    }

    return levelInfo;
  }
}
