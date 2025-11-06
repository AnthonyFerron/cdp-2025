import ProgrammingLanguageCrud from "../crud/programmingLanguageCrud";
import GetProgrammingLanguageBusinessLogicError from "../errors/businessLogic/programmingLanguageBusinessLogicError";
import { ProgrammingLanguage } from "../models/programmingLanguage/programmingLanguage.model";
import ProgrammingLanguageTransformer from "../models/programmingLanguage/programmingLanguageTransformer";
import { IdLanguage } from "../types/custom.types";


export default class ProgrammingLanguageBusinessLogic {

    constructor(
        private readonly programmingLanguageCrud: ProgrammingLanguageCrud
    ) {}

    async getLanguage(idLanguage: IdLanguage): Promise<ProgrammingLanguage> {
        const programmingLanguageDb = await this.programmingLanguageCrud.getLanguage(idLanguage)
        if (programmingLanguageDb) {
            return ProgrammingLanguageTransformer.DbToApi(programmingLanguageDb)
        }
        throw new GetProgrammingLanguageBusinessLogicError()
    }

    async getLanguages(): Promise<ProgrammingLanguage[]> {
        const programmingLanguages = await this.programmingLanguageCrud.getLanguages()
        return programmingLanguages.map(language => ProgrammingLanguageTransformer.DbToApi(language))
    }

    async deleteLanguage(idLanguage: IdLanguage) {
        await this.programmingLanguageCrud.deleteLanguage(idLanguage)
    }

    async createLanguage(name: string, isPublic: boolean) {
        await this.programmingLanguageCrud.createLanguage(name, isPublic)
    }
}