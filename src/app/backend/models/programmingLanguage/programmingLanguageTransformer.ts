import { IdLanguage } from "../../types/custom.types";
import { ProgrammingLanguage, ProgrammingLanguageDb } from "./programmingLanguage.model";


export default class ProgrammingLanguageTransformer {

    static DbToApi(data: ProgrammingLanguageDb): ProgrammingLanguage {
        return {
            idLanguage: data.id_language as IdLanguage,
            isPublic: data.is_public,
            name: data.name
        }
    }
}