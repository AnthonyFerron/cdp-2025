import { NextResponse } from "next/server";
import UserBusinessLogic from "../businessLogic/userBusinessLogic";
import {
  User,
  UserCreateDto,
  UserUpdateDto,
  UserDeleteDto,
  UserAddCoinsDto,
  UserAddExperienceDto,
  UserCalculateLevelDto,
} from "../models/user/user.model";
import { GetUserWithIdBusinessLogicError } from "../errors/businessLogic/userBusinessLogicError";
import { IdCountry, IdUser } from "../types/custom.types";

export default class UserController {
  constructor(private readonly userBusinessLogic: UserBusinessLogic) {}

  async createUser(req: Request) {
    try {
      const {
        id,
        name,
        email,
        emailVerified,
        experience,
        levels,
        coins,
        role,
        idCountry,
      }: UserCreateDto = await req.json();

      if (
        id &&
        typeof id === "string" &&
        name &&
        typeof name === "string" &&
        email &&
        typeof email === "string" &&
        typeof emailVerified === "boolean" &&
        typeof experience === "number" &&
        typeof levels === "number" &&
        typeof coins === "number" &&
        role &&
        typeof role === "string" &&
        idCountry &&
        typeof idCountry === "number"
      ) {
        await this.userBusinessLogic.createUser(
          id as IdUser,
          name,
          email,
          emailVerified,
          experience,
          levels,
          coins,
          role,
          idCountry as IdCountry
        );
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("Les champs sont incomplets", { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async updateUser(req: Request) {
    try {
      const {
        id,
        name,
        email,
        emailVerified,
        experience,
        levels,
        coins,
        role,
        idCountry,
      }: UserUpdateDto = await req.json();

      if (
        id &&
        typeof id === "string" &&
        name &&
        typeof name === "string" &&
        email &&
        typeof email === "string" &&
        typeof emailVerified === "boolean" &&
        typeof experience === "number" &&
        typeof levels === "number" &&
        typeof coins === "number" &&
        role &&
        typeof role === "string" &&
        idCountry &&
        typeof idCountry === "number"
      ) {
        await this.userBusinessLogic.updateUser(
          id as IdUser,
          name,
          email,
          emailVerified,
          experience,
          levels,
          coins,
          role,
          idCountry as IdCountry
        );
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("Les champs sont incomplets", { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async deleteUser(req: Request) {
    try {
      const { id }: UserDeleteDto = await req.json();

      if (id && typeof id === "string") {
        await this.userBusinessLogic.deleteUser(id);
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("L'id de l'utilisateur est incorrect", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async getUserWithId(req: Request) {
    try {
      const url = new URL(req.url);
      const id: unknown = url.searchParams.get("id");

      if (id && typeof id === "string") {
        const user = await this.userBusinessLogic.getUserWithId(id as IdUser);
        return NextResponse.json<User>(user, { status: 200 });
      } else {
        return new NextResponse("L'id de l'utilisateur est incorrect", {
          status: 400,
        });
      }
    } catch (err) {
      if (err instanceof GetUserWithIdBusinessLogicError) {
        return new NextResponse("L'id de l'utilisateur est incorrect", {
          status: 400,
        });
      } else {
        console.error(err);
        return new NextResponse("Erreur serveur", { status: 500 });
      }
    }
  }

  async getUsers() {
    try {
      const users = await this.userBusinessLogic.getUsers();
      return NextResponse.json<User[]>(users, { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async addCoinsToUser(req: Request) {
    try {
      const { id, coins }: UserAddCoinsDto = await req.json();

      if (
        id &&
        typeof id === "string" &&
        typeof coins === "number" &&
        coins > 0
      ) {
        await this.userBusinessLogic.addCoinsToUser(id as IdUser, coins);
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse(
          "L'id de l'utilisateur ou le montant est incorrect",
          {
            status: 400,
          }
        );
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async addExperienceToUser(req: Request) {
    try {
      const { id, experience }: UserAddExperienceDto = await req.json();

      if (
        id &&
        typeof id === "string" &&
        typeof experience === "number" &&
        experience > 0
      ) {
        await this.userBusinessLogic.addExperienceToUser(
          id as IdUser,
          experience
        );
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse(
          "L'id de l'utilisateur ou le montant d'expérience est incorrect",
          {
            status: 400,
          }
        );
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async calculateLevel(req: Request) {
    try {
      const { id }: UserCalculateLevelDto = await req.json();

      if (id && typeof id === "string") {
        const levelInfo = await this.userBusinessLogic.calculateAndUpdateLevel(
          id as IdUser
        );
        return NextResponse.json(levelInfo, { status: 200 });
      } else {
        return new NextResponse("L'id de l'utilisateur est incorrect", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }
}
