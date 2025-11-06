import { NextResponse } from "next/server";
import AchievedBusinessLogic from "../businessLogic/achievedBusinessLogic";
import { IdUser } from "../types/custom.types";
import { Achieved } from "../models/achieved/achieved.model";


export default class AchievedController {

    private readonly achievedBusinessLogic: AchievedBusinessLogic

    constructor() {
        this.achievedBusinessLogic = new AchievedBusinessLogic()
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
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}