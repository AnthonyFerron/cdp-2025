import { NextResponse } from "next/server";
import BadgeBusinessLogic from "../businessLogic/badgeBusinessLogic";
import { Badge, BadgeCreateDto, BadgeDeleteDto, BadgeUpdateDto } from "../models/badge/badge.model";
import { IdBadge } from "../types/custom.types";


export default class BadgeController {

    constructor(
        private readonly badgeBusinessLogic: BadgeBusinessLogic
    ) {}

    async createBadge(req: Request) {
        try {
            const { name, icon }: BadgeCreateDto = await req.json()

            if (
                name && typeof name === 'string' &&
                icon && typeof icon === 'string'
            ) {
                await this.badgeBusinessLogic.createBagde(name, icon)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async updateBadge(req: Request) {
        try {
            const { name, icon, idBadge }: BadgeUpdateDto = await req.json()

            if (
                name && typeof name === 'string' &&
                idBadge && typeof idBadge === 'number' &&
                icon && typeof icon === 'string'
            ) {
                await this.badgeBusinessLogic.updateBadge({
                    icon,
                    name,
                    idBadge: idBadge as IdBadge
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

    async deleteBadge(req: Request) {
        try {
            const { idBadge }: BadgeDeleteDto = await req.json()

            if (idBadge && typeof idBadge === 'number') {
                await this.badgeBusinessLogic.deleteBadge(idBadge as IdBadge)
                return new NextResponse(null, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getBadge(req: Request) {
        try {
            const idBadge = new URL(req.url).searchParams.get('idBadge')

            if (idBadge) {
                const badge = await this.badgeBusinessLogic.getBagde(parseInt(idBadge) as IdBadge)
                return NextResponse.json<Badge>(badge, { status: 200 })
            } else {
                return new NextResponse('Les paramètres sont invalides', { status: 400 })
            }
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getBadges(req: Request) {
        try {
            const badges = await this.badgeBusinessLogic.getBagdes()
            return NextResponse.json<Badge[]>(badges, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}