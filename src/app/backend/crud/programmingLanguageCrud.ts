import CrudError from "../errors/crudError";
import { ProgrammingLanguageDb } from "../models/programmingLanguage/programmingLanguage.model";
import { IdLanguage } from "../types/custom.types";
import ConfigCrud from "./configCrud";


export default class ProgrammingLanguageCrud extends ConfigCrud {

    async getLanguage(idLanguage: IdLanguage): Promise<ProgrammingLanguageDb | null> {
        try {
            return await this.prisma.programming_Language.findUnique({
                where: {
                    id_language: idLanguage
                }
            })
        } catch (err) {
            throw new CrudError('getLanguage', String(err))
        }
    }

    async getLanguages(): Promise<ProgrammingLanguageDb[]> {
        try {
            return await this.prisma.programming_Language.findMany()
        } catch (err) {
            throw new CrudError('getLanguages', String(err))
        }
    }

    async createLanguage(name: string, isPublic: boolean): Promise<void> {
        try {
            await this.prisma.programming_Language.create({
                data: {
                    is_public: isPublic,
                    name: name
                }
            })
        } catch (err) {
            throw new CrudError('createLanguage', String(err))
        }
    }

    async deleteLanguage(idLanguage: IdLanguage): Promise<void> {
        try {
            await this.prisma.programming_Language.delete({
                where: {
                    id_language: idLanguage
                }
            })
        } catch (err) {
           throw new CrudError('deleteLanguage', String(err)) 
        }
    }
}