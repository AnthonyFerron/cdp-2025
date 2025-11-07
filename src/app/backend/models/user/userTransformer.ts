import { IdCountry, IdUser } from "../../types/custom.types";
import { User, UserDB } from "./user.model";

export default class UserTransformer {
  static DbToApi(data: UserDB): User {
    return {
      id: data.id as IdUser,
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      experience: data.experience,
      levels: data.levels,
      coins: data.coins,
      role: data.role,
      idCountry: data.id_country as IdCountry,
      createAt: data.create_at,
    };
  }
}
