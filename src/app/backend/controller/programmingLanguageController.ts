import { NextResponse } from "next/server";
import ProgrammingLanguageBusinessLogic from "../businessLogic/programmingLanguageBusinessLogic";
import { ProgrammingLanguage, ProgrammingLanguageCreateDto, ProgrammingLanguageDeleteDto } from "../models/programmingLanguage/programmingLanguage.model";
import { IdLanguage } from "../types/custom.types";
import GetProgrammingLanguageBusinessLogicError from "../errors/businessLogic/programmingLanguageBusinessLogicError";


export default class ProgrammingLanguageController {

    constructor(
        private readonly programmingLanguageBusinessLogic: ProgrammingLanguageBusinessLogic
    ) {}

    async deleteLanguage(req: Request) {
        try {
            const { idLanguage }: ProgrammingLanguageDeleteDto = await req.json()

            if (idLanguage && typeof idLanguage === 'number') {
                await this.programmingLanguageBusinessLogic.deleteLanguage(idLanguage as IdLanguage)
                return new NextResponse(null, { status: 200 })
            }
            return new NextResponse('Id language invalide', { status: 400 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async createLanguage(req: Request) {
        try {
            const { name, isPublic }: ProgrammingLanguageCreateDto = await req.json()

            if (name && typeof name === 'string' && typeof isPublic === 'boolean') {
                await this.programmingLanguageBusinessLogic.createLanguage(name, isPublic)
                return new NextResponse(null, { status: 200 })
            }
            return new NextResponse('Les paramètres sont invalides', { status: 400 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }

    async getLanguage(req: Request) {
        try {
            const id = new URL(req.url).searchParams.get('id')

            if (id) {
                const programmingLanguage = await this.programmingLanguageBusinessLogic.getLanguage(parseInt(id) as IdLanguage)
                return NextResponse.json<ProgrammingLanguage>(programmingLanguage, { status: 200 })
            }
            return new NextResponse('Erreur idLanguage invalide', { status: 400 })
        } catch (err) {
            if (err instanceof GetProgrammingLanguageBusinessLogicError) {
                return new NextResponse('Erreur idLanguage invalide', { status: 400 })
            } else {
                console.error(err)
                return new NextResponse('Erreur serveur', { status: 500 })
            }
        }
    }

    async getLanguages(req: Request) {
        try {
            const programmingLanguages = await this.programmingLanguageBusinessLogic.getLanguages()
            return NextResponse.json<ProgrammingLanguage[]>(programmingLanguages, { status: 200 })
        } catch (err) {
            console.error(err)
            return new NextResponse('Erreur serveur', { status: 500 })
        }
    }
}