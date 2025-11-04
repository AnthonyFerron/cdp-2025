import { Mission, MissionDB } from "./mission.model";


export default class MissionTransformer {

    static DbToApi(data: MissionDB): Mission {
        return {
            idMission: data.id_mission,
            idBadge: data.id_badge,
            content: data.content,
            targetType: data.target_type,
            title: data.title,
            rewardCoins: data.reward_coins,
            rewardXp: data.reward_xp,
            createAt: data.create_at
        }
    }
}