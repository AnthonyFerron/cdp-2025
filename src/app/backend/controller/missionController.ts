import { NextResponse } from "next/server";
import MissionBusinessLogic from "../businessLogic/missionBusinessLogic";
import { MissionCreateDto } from "../models/mission/mission.model";


export default class MissionController {

    constructor(
        private readonly userBusinesLogic: MissionBusinessLogic
    ) {}

    async createMission(req: Request) {
        try {
            const {
                title,
                content,
                rewardCoins,
                rewardXp,
                targetType,
                idBadge
            }: MissionCreateDto = await req.json()

            if (
                title && typeof title === 'string' &&
                content && typeof content === 'string' &&
                rewardCoins && typeof rewardCoins === 'number' &&
                rewardXp && typeof rewardXp === 'number' &&
                targetType && typeof targetType === 'string'
            ) {
                await this.userBusinesLogic.createMission(
                    title,
                    content,
                    rewardCoins,
                    rewardXp,
                    targetType,
                    idBadge
                )
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les champs sont incomplets', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}