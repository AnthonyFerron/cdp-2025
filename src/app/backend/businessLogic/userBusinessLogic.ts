import UserCrud from "../crud/userCrud"
import { IdCountry, IdMission, IdUser } from "../types/custom.types"
import UserTransformer from "../models/user/userTransformer"
import { GetUserWithIdBusinessLogicError } from "../errors/businessLogic/userBusinessLogicError"
import { User } from "../models/user/user.model"
import UserLevelCalculator from "../services/userLevelCalculator"
import MissionBusinessLogic from "./missionBusinessLogic"
import MissionCrud from "../crud/missionCrud"
import EarnedBusinessLogic from "./earnedBusinessLogic"
import AchievedBusinessLogic from "./achievedBusinessLogic"

export default class UserBusinessLogic {

	private readonly levelCalculator: UserLevelCalculator
	private readonly missionBusinessLogic: MissionBusinessLogic
	private readonly earnedBusinessLogic: EarnedBusinessLogic
	private readonly achievedBusinessLogic: AchievedBusinessLogic

	constructor(private readonly userCrud: UserCrud) {
		this.levelCalculator = new UserLevelCalculator()
		this.missionBusinessLogic = new MissionBusinessLogic(new MissionCrud())
		this.earnedBusinessLogic = new EarnedBusinessLogic()
		this.achievedBusinessLogic = new AchievedBusinessLogic()
	}

	async createUser(
		id: IdUser,
		name: string,
		email: string,
		emailVerified: boolean,
		experience: number,
		levels: number,
		coins: number,
		role: string,
		idCountry: IdCountry
	) {
		await this.userCrud.createUser(
			id,
			name,
			email,
			emailVerified,
			experience,
			levels,
			coins,
			role,
			idCountry
		)
	}

	async updateUser(
		id: IdUser,
		name: string,
		email: string,
		emailVerified: boolean,
		experience: number,
		levels: number,
		coins: number,
		role: string,
		idCountry: IdCountry
	) {
		await this.userCrud.updateUser(
			id,
			name,
			email,
			emailVerified,
			experience,
			levels,
			coins,
			role,
			idCountry
		)
	}

	async deleteUser(id: IdUser) {
		await this.userCrud.deleteUser(id)
	}

	async getUserWithId(id: IdUser): Promise<User> {
		const userDb = await this.userCrud.getUserWithId(id)
		if (userDb) {
			return UserTransformer.DbToApi(userDb)
		}
		throw new GetUserWithIdBusinessLogicError()
	}

	async getUsers(): Promise<User[]> {
		const usersDb = await this.userCrud.getUsers()
		return usersDb.map((user) => UserTransformer.DbToApi(user))
	}

	async addCoinsToUser(id: IdUser, coinsToAdd: number) {
		await this.userCrud.addCoinsToUser(id, coinsToAdd)
	}

	async addExperienceToUser(id: IdUser, experienceToAdd: number) {
		await this.userCrud.addExperienceToUser(id, experienceToAdd)
	}

	async missionCompleted(idUser: IdUser, idMission: IdMission) {
		const mission = await this.missionBusinessLogic.getMissionWithId(idMission)

		if (mission.rewardCoins) {
			await this.addCoinsToUser(idUser, mission.rewardCoins)
		}

		if (mission.rewardXp) {
			await this.addExperienceToUser(idUser, mission.rewardXp)
		}

		if (mission.idBadge) {
			await this.earnedBusinessLogic.createEarned(mission.idBadge, idUser)
		}

		const achieved = await this.achievedBusinessLogic.getAchieved(idUser, idMission)
		achieved.isCompleted = true
		await this.achievedBusinessLogic.updateAchieved(achieved)
	}

	async calculateAndUpdateLevel(id: IdUser): Promise<{
		hasLeveledUp: boolean
		newLevel: number
		levelsGained: number
		xpForNextLevel: number
		xpProgress: number
		xpNeededForNextLevel: number
		progressPercentage: number
	}> {
		const user = await this.getUserWithId(id)

		const levelInfo = this.levelCalculator.checkLevelUp(
			user.levels,
			user.experience
		)

		if (levelInfo.hasLeveledUp) {
			await this.userCrud.updateUserLevel(id, levelInfo.newLevel)
		}

		const finalLevelInfo = this.levelCalculator.checkLevelUp(
			levelInfo.newLevel,
			user.experience
		)

		return {
			...finalLevelInfo,
			hasLeveledUp: levelInfo.hasLeveledUp,
			levelsGained: levelInfo.levelsGained,
		}
	}
}
