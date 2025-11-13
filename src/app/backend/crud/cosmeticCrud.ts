import CrudError from "../errors/crudError";
import {
  Cosmetic,
  CosmeticDb,
  CosmeticType,
} from "../models/cosmetic/cosmetic.model";
import { IdCosmetic } from "../types/custom.types";
import ConfigCrud from "./configCrud";

export default class CosmeticCrud extends ConfigCrud {
  async createCosmetic(
    type: CosmeticType,
    price: number,
    isActive: boolean,
    image: string,
    name: string
  ) {
    try {
      await this.prisma.cosmetic.create({
        data: {
          type,
          image,
          name,
          price,
          is_active: isActive,
        },
      });
    } catch (err) {
      throw new CrudError("createCosmetic", String(err));
    }
  }

  async deleteCosmetic(idCosmetic: IdCosmetic) {
    try {
      await this.prisma.cosmetic.delete({
        where: {
          id_cosmetic: idCosmetic,
        },
      });
    } catch (err) {
      throw new CrudError("deleteCosmetic", String(err));
    }
  }

  async updateCosmetic(cosmetic: Cosmetic) {
    try {
      await this.prisma.cosmetic.update({
        where: {
          id_cosmetic: cosmetic.idCosmetic,
        },
        data: {
          name: cosmetic.name,
          price: cosmetic.price,
          is_active: cosmetic.isActive,
          type: cosmetic.type,
          image: cosmetic.image,
        },
      });
    } catch (err) {
      throw new CrudError("updateCosmetic", String(err));
    }
  }

  async getCosmetic(idCosmetic: IdCosmetic): Promise<CosmeticDb | null> {
    try {
      return await this.prisma.cosmetic.findUnique({
        where: {
          id_cosmetic: idCosmetic,
        },
      });
    } catch (err) {
      throw new CrudError("getCosmetic", String(err));
    }
  }

  async getCosmetics(): Promise<CosmeticDb[]> {
    try {
      return await this.prisma.cosmetic.findMany();
    } catch (err) {
      throw new CrudError("getCosmetics", String(err));
    }
  }
}
