import { NextResponse } from "next/server";
import AchievedBusinessLogic from "../businessLogic/achievedBusinessLogic";
import { IdCosmetic, IdUser } from "../types/custom.types";
import { Achieved } from "../models/achieved/achieved.model";
import CosmeticCrud from "../crud/cosmeticCrud";
import OwnedBusinessLogic from "../businessLogic/ownedBusinessLogic";
import OwnedCrud from "../crud/ownedCrud";
import UserCrud from "../crud/userCrud";


export default class AchievedController {

    private readonly achievedBusinessLogic: AchievedBusinessLogic
    private readonly ownedBusinessLogic: OwnedBusinessLogic

    constructor() {
        this.achievedBusinessLogic = new AchievedBusinessLogic()
        this.ownedBusinessLogic = new OwnedBusinessLogic(
            new OwnedCrud(),
            new UserCrud(),
            new CosmeticCrud()
        )
    }

    async getAchieveds(req: Request) {
        try {
            const idUser = new URL(req.url).searchParams.get('idUser')

            if (idUser && typeof idUser === 'string') {
                const achieveds = await this.achievedBusinessLogic.getAchieveds(idUser as IdUser)
                return NextResponse.json<Achieved[]>(achieveds, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async attachMissions(req: Request) {
        try {
            const idUser = new URL(req.url).searchParams.get('idUser')

            if (idUser && typeof idUser === 'string') {
                await this.achievedBusinessLogic.attachMissionsOnUser(idUser as IdUser)

                // Put default avatar & banner
                await this.ownedBusinessLogic.purchaseCosmetic(idUser as IdUser, 5 as IdCosmetic)
                await this.ownedBusinessLogic.purchaseCosmetic(idUser as IdUser, 7 as IdCosmetic)
                await this.ownedBusinessLogic.equipCosmetic(idUser as IdUser, 5 as IdCosmetic)
                await this.ownedBusinessLogic.equipCosmetic(idUser as IdUser, 7 as IdCosmetic)

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