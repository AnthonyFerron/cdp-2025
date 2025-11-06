import { IdCosmetic, IdUser } from "../../types/custom.types";
import { Owned, OwnedDb } from "./owned.model";

export default class OwnedTransformer {
  static DbToApi(ownedDb: OwnedDb): Owned {
    return {
      userId: ownedDb.user_id as IdUser,
      idCosmetic: ownedDb.id_cosmetic as IdCosmetic,
      isEquiped: ownedDb.is_equiped,
      aquiredAt: ownedDb.aquired_at,
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
