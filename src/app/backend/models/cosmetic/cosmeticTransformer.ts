import { IdCosmetic } from "../../types/custom.types";
import { Cosmetic, CosmeticDb, CosmeticType } from "./cosmetic.model";


export default class CosmeticTransformer {

    static DbToApi(cosmetic: CosmeticDb): Cosmetic {
        return {
            idCosmetic: cosmetic.id_cosmetic as IdCosmetic,
            type: cosmetic.type as CosmeticType,
            price: cosmetic.price,
            name: cosmetic.name,
            isActive: cosmetic.is_active,
            image: cosmetic.image
        }
    }
}