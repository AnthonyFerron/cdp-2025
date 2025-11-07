import { IdCosmetic, IdUser } from "../../types/custom.types";
import { Owned, OwnedDb } from "./owned.model";
import { Cosmetic } from "@/app/models/cosmetic.model";

export default class OwnedTransformer {
  static DbToApi(ownedDb: OwnedDb): Owned & { Cosmetic?: Cosmetic } {
    return {
      userId: ownedDb.user_id as IdUser,
      idCosmetic: ownedDb.id_cosmetic as IdCosmetic,
      isEquiped: ownedDb.is_equiped,
      aquiredAt: ownedDb.aquired_at,
      Cosmetic: ownedDb.Cosmetic
        ? {
            idCosmetic: ownedDb.Cosmetic.id_cosmetic as IdCosmetic,
            type: ownedDb.Cosmetic.type as "AVATAR" | "BANNER",
            price: ownedDb.Cosmetic.price,
            isActive: ownedDb.Cosmetic.is_active,
            image: ownedDb.Cosmetic.image,
            name: ownedDb.Cosmetic.name,
          }
        : undefined,
    };
  }

  static ApiToDb(owned: Owned): OwnedDb {
    return {
      user_id: owned.userId,
      id_cosmetic: owned.idCosmetic,
      is_equiped: owned.isEquiped,
      aquired_at: owned.aquiredAt,
    };
  }
}
