import { IdCosmetic, IdUser } from "../../types/custom.types";
import { Cosmetic as CosmeticDb } from "@prisma/client";

export type OwnedDb = {
  user_id: string;
  id_cosmetic: number;
  is_equiped: boolean;
  aquired_at: Date;
  Cosmetic?: CosmeticDb;
};

export type Owned = {
  userId: IdUser;
  idCosmetic: IdCosmetic;
  isEquiped: boolean;
  aquiredAt: Date;
};

export type OwnedPurchaseDto = {
  idCosmetic?: unknown;
};

export type OwnedEquipDto = {
  idCosmetic?: unknown;
  isEquiped?: unknown;
};
