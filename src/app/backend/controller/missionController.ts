import { NextResponse } from "next/server";
import MissionBusinessLogic from "../businessLogic/missionBusinessLogic";
import { Mission, MissionCreateDto, MissionDeleteDto } from "../models/mission/mission.model";
import { GetMissionWithIdBusinessLogicError } from "../errors/businessLogic/missionBusinessLogicError";
import { IdMission } from "../types/custom.types";


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

    async deleteMission(req: Request) {
        try {
            const { idMission }: MissionDeleteDto = await req.json()

            if (idMission && typeof idMission === 'number') {
                await this.userBusinesLogic.deleteMission(idMission)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse(`L'id de la mission est incorrect`, { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getMissionWithId(req: Request) {
        try {
            const url = new URL(req.url)
            const idMission: unknown = url.searchParams.get('id')
            
            if (idMission && typeof idMission === 'string') {
                const mission = await this.userBusinesLogic.getMissionWithId(parseInt(idMission) as IdMission)
                return NextResponse.json<Mission>(mission, { status: 200 })
            } else {
                return new NextResponse(`L'id de la mission est incorrect`, { status: 400 })
            }
        } catch (err) {
            if (err instanceof GetMissionWithIdBusinessLogicError) {
                return new NextResponse(`L'id de la mission est incorrect`, { status: 400 })
            } else {
                console.error(err)
                return new NextResponse('Erreur serveur', { status: 500 })
            }
        }
    }

    async getMissions(req: Request) {
        try {
            const missions = await this.userBusinesLogic.getMissions()
            return NextResponse.json<Mission[]>(missions, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}