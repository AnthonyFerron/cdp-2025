import CosmeticCrud from "../crud/cosmeticCrud";
import { GetCosmeticBusinessLogic, InvalidTypeCosmeticBusinessLogic } from "../errors/businessLogic/cosmeticBusinessLogicError";
import { Cosmetic, CosmeticType } from "../models/cosmetic/cosmetic.model";
import CosmeticTransformer from "../models/cosmetic/cosmeticTransformer";
import { IdCosmetic } from "../types/custom.types";


export default class CosmeticBusinessLogic {

    constructor(
        private readonly cosmeticCrud: CosmeticCrud
    ) {}

    static COSMECTIC_TYPE = ['AVATAR', 'BANNER']

    async createCosmetic(type: string, price: number, isActive: boolean, image: string, name: string) {
        if (CosmeticBusinessLogic.COSMECTIC_TYPE.includes(type)) {
            await this.cosmeticCrud.createCosmetic(type as CosmeticType, price, isActive, image, name)
        } else {
            throw new InvalidTypeCosmeticBusinessLogic()
        }
    }

    async deleteCosmetic(idCosmetic: IdCosmetic) {
        await this.cosmeticCrud.deleteCosmetic(idCosmetic)
    }

    async updateCosmetic(cosmetic: Cosmetic) {
        if (CosmeticBusinessLogic.COSMECTIC_TYPE.includes(cosmetic.type)) {
            await this.cosmeticCrud.updateCosmetic(cosmetic)
        } else {
            throw new InvalidTypeCosmeticBusinessLogic()
        }
    }

    async getCosmetic(idCosmetic: IdCosmetic): Promise<Cosmetic> {
        const cosmeticDb = await this.cosmeticCrud.getCosmetic(idCosmetic)
        if (cosmeticDb) {
            return CosmeticTransformer.DbToApi(cosmeticDb)
        }
        throw new GetCosmeticBusinessLogic()
    }

    async getCosmetics(): Promise<Cosmetic[]> {
        const cosmeticsDb = await this.cosmeticCrud.getCosmetics()
        return cosmeticsDb.map(cosmetic => CosmeticTransformer.DbToApi(cosmetic))
    }
}