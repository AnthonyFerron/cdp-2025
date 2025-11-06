import { NextResponse } from "next/server";
import EarnedBusinessLogic from "../businessLogic/earnedBusinessLogic";
import { IdBadge, IdUser } from "../types/custom.types";
import { Earned, EarnedUpdateDto } from "../models/earned/earned.model";


export default class EarnedController {

    private readonly earnedBusinessLogic: EarnedBusinessLogic

    constructor() {
        this.earnedBusinessLogic = new EarnedBusinessLogic()
    }

    async getEarneds(req: Request) {
        try {
            const idUser = new URL(req.url).searchParams.get('idUser')

            if (idUser) {
                const earneds = await this.earnedBusinessLogic.getEarneds(idUser as IdUser)
                return NextResponse.json<Earned[]>(earneds, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateEarned(req: Request) {
        try {
            const {
                idBadge,
                idUser,
                isEquiped
            }: EarnedUpdateDto = await req.json()

            if (
                idBadge && typeof idBadge === 'number' &&
                idUser && typeof idUser === 'string' &&
                typeof isEquiped === 'boolean'
            ) {
                await this.earnedBusinessLogic.updateEarned({
                    idBadge: idBadge as IdBadge,
                    idUser: idUser as IdUser,
                    isEquiped
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
}