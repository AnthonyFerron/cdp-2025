import { NextResponse } from "next/server";
import CosmeticBusinessLogic from "../businessLogic/cosmeticBusinessLogic";
import { Cosmetic, CosmeticCreateDto, CosmeticDeleteDto, CosmeticType, CosmeticUpdateDto } from "../models/cosmetic/cosmetic.model";
import { IdCosmetic } from "../types/custom.types";


export default class CosmeticController {

    constructor(
        private readonly cosmeticBusinessLogic: CosmeticBusinessLogic
    ) {}

    async createCosmetic(req: Request) {
        try {
            const {
                name,
                price,
                image,
                isActive,
                type
            }: CosmeticCreateDto = await req.json()

            if (
                name && typeof name === 'string' &&
                price && typeof price === 'number' &&
                image && typeof image === 'string' &&
                typeof isActive === 'boolean' &&
                type && typeof type === 'string'
            ) {
                await this.cosmeticBusinessLogic.createCosmetic(type, price, isActive, image, name)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async deleteCosmetic(req: Request) {
        try {
            const { idCosmetic }: CosmeticDeleteDto = await req.json()

            if (idCosmetic && typeof idCosmetic === 'number') {
                await this.cosmeticBusinessLogic.deleteCosmetic(idCosmetic as IdCosmetic)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateCosmetic(req: Request) {
        try {
            const {
                name,
                price,
                image,
                isActive,
                type,
                idCosmetic
            }: CosmeticUpdateDto = await req.json()

            if (
                name && typeof name === 'string' &&
                price && typeof price === 'number' &&
                idCosmetic && typeof idCosmetic === 'number' &&
                image && typeof image === 'string' &&
                typeof isActive === 'boolean' &&
                type && typeof type === 'string'
            ) {
                await this.cosmeticBusinessLogic.updateCosmetic({
                    name,
                    price,
                    image,
                    isActive,
                    idCosmetic: idCosmetic as IdCosmetic,
                    type: type as CosmeticType
                })
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCosmetic(req: Request) {
        try {
            const idCosmetic = new URL(req.url).searchParams.get('idCosmetic')

            if (idCosmetic) {
                const cosmetic = await this.cosmeticBusinessLogic.getCosmetic(parseInt(idCosmetic) as IdCosmetic)
                return NextResponse.json<Cosmetic>(cosmetic, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getCosmetics(req: Request) {
        try {
            const cosmetics = await this.cosmeticBusinessLogic.getCosmetics()
            return NextResponse.json<Cosmetic[]>(cosmetics, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}