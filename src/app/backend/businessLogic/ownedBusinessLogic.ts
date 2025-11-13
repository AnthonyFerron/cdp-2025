import CosmeticCrud from "../crud/cosmeticCrud";
import OwnedCrud from "../crud/ownedCrud";
import UserCrud from "../crud/userCrud";
import {
  CosmeticAlreadyOwnedBusinessLogic,
  CosmeticNotFoundBusinessLogic,
  InsufficientCoinsBusinessLogic,
  UserNotFoundBusinessLogic,
} from "../errors/businessLogic/ownedBusinessLogicError";
import { Owned } from "../models/owned/owned.model";
import OwnedTransformer from "../models/owned/ownedTransformer";
import { IdCosmetic, IdUser } from "../types/custom.types";

export default class OwnedBusinessLogic {
  constructor(
    private readonly ownedCrud: OwnedCrud,
    private readonly userCrud: UserCrud,
    private readonly cosmeticCrud: CosmeticCrud
  ) {}

  async purchaseCosmetic(userId: IdUser, idCosmetic: IdCosmetic) {
    // Vérifier que le cosmétique existe
    const cosmetic = await this.cosmeticCrud.getCosmetic(idCosmetic);
    if (!cosmetic) {
      throw new CosmeticNotFoundBusinessLogic();
    }

    // Vérifier que l'utilisateur existe et récupérer ses coins
    const user = await this.userCrud.getUserWithId(userId);
    if (!user) {
      throw new UserNotFoundBusinessLogic();
    }

    // Vérifier que l'utilisateur ne possède pas déjà ce cosmétique
    const alreadyOwned = await this.ownedCrud.checkIfOwned(userId, idCosmetic);
    if (alreadyOwned) {
      throw new CosmeticAlreadyOwnedBusinessLogic();
    }

    // Vérifier que l'utilisateur a assez de coins
    if (user.coins < cosmetic.price) {
      throw new InsufficientCoinsBusinessLogic();
    }

    // Débiter les coins de l'utilisateur
    const newCoins = user.coins - cosmetic.price;
    await this.userCrud.updateCoins(userId, newCoins);

    // Créer la relation owned
    await this.ownedCrud.createOwned(userId, idCosmetic);
  }

  async getOwnedCosmetics(userId: IdUser): Promise<Owned[]> {
    const ownedDb = await this.ownedCrud.getOwnedByUser(userId);
    return ownedDb.map((owned) => OwnedTransformer.DbToApi(owned));
  }

  async equipCosmetic(userId: IdUser, idCosmetic: IdCosmetic) {
    // Vérifier que l'utilisateur possède ce cosmétique
    const alreadyOwned = await this.ownedCrud.checkIfOwned(userId, idCosmetic);
    if (!alreadyOwned) {
      throw new CosmeticNotFoundBusinessLogic();
    }

    // Récupérer le type du cosmétique pour déséquiper les autres du même type
    const cosmetic = await this.cosmeticCrud.getCosmetic(idCosmetic);
    if (!cosmetic) {
      throw new CosmeticNotFoundBusinessLogic();
    }

    // Déséquiper tous les cosmétiques du même type
    await this.ownedCrud.unequipAllOfType(userId, cosmetic.type);

    // Équiper le cosmétique sélectionné
    await this.ownedCrud.updateEquipStatus(userId, idCosmetic, true);
  }

  async unequipCosmetic(userId: IdUser, idCosmetic: IdCosmetic) {
    // Vérifier que l'utilisateur possède ce cosmétique
    const alreadyOwned = await this.ownedCrud.checkIfOwned(userId, idCosmetic);
    if (!alreadyOwned) {
      throw new CosmeticNotFoundBusinessLogic();
    }

    // Déséquiper le cosmétique
    await this.ownedCrud.updateEquipStatus(userId, idCosmetic, false);
  }
}
