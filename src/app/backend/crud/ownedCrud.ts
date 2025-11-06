import CrudError from "../errors/crudError";
import { OwnedDb } from "../models/owned/owned.model";
import { IdCosmetic, IdUser } from "../types/custom.types";
import ConfigCrud from "./configCrud";

export default class OwnedCrud extends ConfigCrud {
  async createOwned(userId: IdUser, idCosmetic: IdCosmetic) {
    try {
      await this.prisma.owned.create({
        data: {
          user_id: userId,
          id_cosmetic: idCosmetic,
          is_equiped: false,
          aquired_at: new Date(),
        },
      });
    } catch (err) {
      throw new CrudError("createOwned", String(err));
    }
  }

  async getOwnedByUser(userId: IdUser): Promise<OwnedDb[]> {
    try {
      return await this.prisma.owned.findMany({
        where: {
          user_id: userId,
        },
        include: {
          Cosmetic: true,
        },
      });
    } catch (err) {
      throw new CrudError("getOwnedByUser", String(err));
    }
  }

  async checkIfOwned(userId: IdUser, idCosmetic: IdCosmetic): Promise<boolean> {
    try {
      const owned = await this.prisma.owned.findUnique({
        where: {
          user_id_id_cosmetic: {
            user_id: userId,
            id_cosmetic: idCosmetic,
          },
        },
      });
      return owned !== null;
    } catch (err) {
      throw new CrudError("checkIfOwned", String(err));
    }
  }

  async updateEquipStatus(
    userId: IdUser,
    idCosmetic: IdCosmetic,
    isEquiped: boolean
  ) {
    try {
      await this.prisma.owned.update({
        where: {
          user_id_id_cosmetic: {
            user_id: userId,
            id_cosmetic: idCosmetic,
          },
        },
        data: {
          is_equiped: isEquiped,
        },
      });
    } catch (err) {
      throw new CrudError("updateEquipStatus", String(err));
    }
  }

  async unequipAllOfType(userId: IdUser, type: string) {
    try {
      await this.prisma.owned.updateMany({
        where: {
          user_id: userId,
          Cosmetic: {
            type: type,
          },
        },
        data: {
          is_equiped: false,
        },
      });
    } catch (err) {
      throw new CrudError("unequipAllOfType", String(err));
    }
  }
}
