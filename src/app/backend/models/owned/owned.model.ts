import { IdCosmetic, IdUser } from "../../types/custom.types";

export type OwnedDb = {
  user_id: string;
  id_cosmetic: number;
  is_equiped: boolean;
  aquired_at: Date;
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
