import ProgrammingLanguageCrud from "../../../crud/programmingLanguageCrud";
import ProgrammingLanguageBusinessLogic from "../../../businessLogic/programmingLanguageBusinessLogic";
import ProgrammingLanguageController from "../../../controller/programmingLanguageController";


const programmingLanguageCrud = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguageCrud)
const programmingLanguageController = new ProgrammingLanguageController(programmingLanguageBusinessLogic)

export const GET = async (req: Request) => {
  const id = new URL(req.url).searchParams.get('id')
  if (id) {
    return await programmingLanguageController.getLanguage(req)
  }
  return await programmingLanguageController.getLanguages(req)
}