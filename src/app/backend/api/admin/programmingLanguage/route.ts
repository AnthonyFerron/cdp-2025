import ProgrammingLanguageCrud from "../../../crud/programmingLanguageCrud";
import ProgrammingLanguageBusinessLogic from "../../../businessLogic/programmingLanguageBusinessLogic";
import ProgrammingLanguageController from "../../../controller/programmingLanguageController";


const programmingLanguageCrud = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguageCrud)
const programmingLanguageController = new ProgrammingLanguageController(programmingLanguageBusinessLogic)

export const DELETE = async (req: Request) => await programmingLanguageController.deleteLanguage(req)
export const POST = async (req: Request) => await programmingLanguageController.createLanguage(req)