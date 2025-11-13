import { IdCosmetic } from "../types/custom.types";
import { Cosmetic } from "./cosmetic.model";

export type Owned = {
  userId: string;
  idCosmetic: IdCosmetic;
  isEquiped: boolean;
  aquiredAt: Date;
  Cosmetic?: Cosmetic;
};
