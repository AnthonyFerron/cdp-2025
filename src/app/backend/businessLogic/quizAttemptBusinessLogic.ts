import CourseCrud from "../crud/courseCrud";
import MissionCrud from "../crud/missionCrud";
import ProgrammingLanguageCrud from "../crud/programmingLanguageCrud";
import QuizAttemptCrud from "../crud/quizAttemptCrud";
import QuizCrud from "../crud/quizCrud";
import UserCrud from "../crud/userCrud";
import { QuizAttempt } from "../models/quizAttempt/quizAttempt.model";
import QuizAttemptTransformer from "../models/quizAttempt/quizAttemptTransformer";
import { IdQuiz, IdUser } from "../types/custom.types";
import CourseBusinessLogic from "./courseBusinessLogic";
import MissionBusinessLogic from "./missionBusinessLogic";
import ProgrammingLanguageBusinessLogic from "./programmingLanguageBusinessLogic";
import QuizBusinessLogic from "./quizBusinessLogic";
import UserBusinessLogic from "./userBusinessLogic";


const programmingLanguage = new ProgrammingLanguageCrud()
const programmingLanguageBusinessLogic = new ProgrammingLanguageBusinessLogic(programmingLanguage)

const courseCrud = new CourseCrud()
const courseBusinessLogic = new CourseBusinessLogic(courseCrud, programmingLanguageBusinessLogic)

export default class QuizAttemptBusinessLogic {

    private readonly quizAttemptCrud: QuizAttemptCrud
    private readonly quizBusinessLogic: QuizBusinessLogic
    private readonly missionBusinessLogic: MissionBusinessLogic
    private readonly userBusinessLogic: UserBusinessLogic

    constructor() {
        this.quizAttemptCrud = new QuizAttemptCrud()
        this.quizBusinessLogic = new QuizBusinessLogic(new QuizCrud(), courseBusinessLogic)
        this.missionBusinessLogic = new MissionBusinessLogic(new MissionCrud())
        this.userBusinessLogic = new UserBusinessLogic(new UserCrud())
    }

    async createQuizAttempt(score: number, passed: boolean, startedAt: Date, idQuiz: IdQuiz, idUser: IdUser) {
        await this.quizAttemptCrud.createQuizAttempt(score, passed, startedAt, idQuiz, idUser)
        if (passed) {
            const quiz = await this.quizBusinessLogic.getQuizWithIdQuiz(idQuiz)
            const mission = (await this.missionBusinessLogic.getMissions()).find(m => m.idCourse === quiz.idCourse)
            if (mission) {
                await this.userBusinessLogic.missionCompleted(idUser, mission.idMission)
            }
        }
    }

    async getQuizAttempts(idUser: IdUser, idQuiz: IdQuiz): Promise<QuizAttempt[]> {
        const quizAttemptsDb = await this.quizAttemptCrud.getQuizAttempts(idUser, idQuiz)
        return quizAttemptsDb.map(quizAttempt => QuizAttemptTransformer.DbToApi(quizAttempt))
    }
}