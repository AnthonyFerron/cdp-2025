import CrudError from "../errors/crudError";
import { UserDB } from "../models/user/user.model";
import { IdCountry, IdUser } from "../types/custom.types";
import ConfigCrud from "./configCrud";

export default class UserCrud extends ConfigCrud {
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
    try {
      await this.prisma.user.create({
        data: {
          id,
          name,
          email,
          emailVerified,
          experience,
          levels,
          coins,
          role,
          id_country: idCountry,
        },
      });
    } catch (err) {
      throw new CrudError("createUser", String(err));
    }
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
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          emailVerified,
          experience,
          levels,
          coins,
          role,
          id_country: idCountry,
        },
      });
    } catch (err) {
      throw new CrudError("updateUser", String(err));
    }
  }

  async deleteUser(id: IdUser) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new CrudError("deleteUser", String(err));
    }
  }

  async getUserWithId(id: IdUser): Promise<UserDB | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          experience: true,
          levels: true,
          coins: true,
          role: true,
          id_country: true,
          create_at: true,
        },
      });
    } catch (err) {
      throw new CrudError("getUserWithId", String(err));
    }
  }

  async getUsers(): Promise<UserDB[]> {
    try {
      return await this.prisma.user.findMany({
        orderBy: { id: "asc" },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          experience: true,
          levels: true,
          coins: true,
          role: true,
          id_country: true,
          create_at: true,
        },
      });
    } catch (err) {
      throw new CrudError("getUsers", String(err));
    }
  }

  async addCoinsToUser(id: IdUser, coinsToAdd: number) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          coins: {
            increment: coinsToAdd,
          },
        },
      });
    } catch (err) {
      throw new CrudError("addCoinsToUser", String(err));
    }
  }

  async addExperienceToUser(id: IdUser, experienceToAdd: number) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          experience: {
            increment: experienceToAdd,
          },
        },
      });
    } catch (err) {
      throw new CrudError("addExperienceToUser", String(err));
    }
  }

  async updateUserLevel(id: IdUser, newLevel: number) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          levels: newLevel,
        },
      });
    } catch (err) {
      throw new CrudError("updateUserLevel", String(err));
    }
  }
}
