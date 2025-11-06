import { NextResponse } from "next/server";
import OwnedBusinessLogic from "../businessLogic/ownedBusinessLogic";
import {
  Owned,
  OwnedEquipDto,
  OwnedPurchaseDto,
} from "../models/owned/owned.model";
import { IdCosmetic, IdUser } from "../types/custom.types";
import {
  CosmeticAlreadyOwnedBusinessLogic,
  CosmeticNotFoundBusinessLogic,
  InsufficientCoinsBusinessLogic,
  UserNotFoundBusinessLogic,
} from "../errors/businessLogic/ownedBusinessLogicError";

export default class OwnedController {
  constructor(private readonly ownedBusinessLogic: OwnedBusinessLogic) {}

  async purchaseCosmetic(req: Request) {
    try {
      const { idCosmetic }: OwnedPurchaseDto = await req.json();
      const userId = new URL(req.url).searchParams.get("userId");

      if (
        idCosmetic &&
        typeof idCosmetic === "number" &&
        userId &&
        typeof userId === "string"
      ) {
        await this.ownedBusinessLogic.purchaseCosmetic(
          userId as IdUser,
          idCosmetic as IdCosmetic
        );
        return new NextResponse(JSON.stringify({ message: "Achat réussi" }), {
          status: 200,
        });
      } else {
        return new NextResponse("Les paramètres sont invalides", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);

      if (err instanceof InsufficientCoinsBusinessLogic) {
        return new NextResponse("Vous n'avez pas assez de coins", {
          status: 400,
        });
      }
      if (err instanceof CosmeticAlreadyOwnedBusinessLogic) {
        return new NextResponse("Vous possédez déjà ce cosmétique", {
          status: 400,
        });
      }
      if (err instanceof CosmeticNotFoundBusinessLogic) {
        return new NextResponse("Ce cosmétique n'existe pas", { status: 404 });
      }
      if (err instanceof UserNotFoundBusinessLogic) {
        return new NextResponse("Utilisateur non trouvé", { status: 404 });
      }

      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async getOwnedCosmetics(req: Request) {
    try {
      const userId = new URL(req.url).searchParams.get("userId");

      if (userId && typeof userId === "string") {
        const ownedCosmetics = await this.ownedBusinessLogic.getOwnedCosmetics(
          userId as IdUser
        );
        return NextResponse.json<Owned[]>(ownedCosmetics, { status: 200 });
      } else {
        return new NextResponse("Les paramètres sont invalides", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async equipCosmetic(req: Request) {
    try {
      const { idCosmetic }: OwnedEquipDto = await req.json();
      const userId = new URL(req.url).searchParams.get("userId");

      if (
        idCosmetic &&
        typeof idCosmetic === "number" &&
        userId &&
        typeof userId === "string"
      ) {
        await this.ownedBusinessLogic.equipCosmetic(
          userId as IdUser,
          idCosmetic as IdCosmetic
        );
        return new NextResponse(
          JSON.stringify({ message: "Cosmétique équipé" }),
          { status: 200 }
        );
      } else {
        return new NextResponse("Les paramètres sont invalides", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);

      if (err instanceof CosmeticNotFoundBusinessLogic) {
        return new NextResponse("Vous ne possédez pas ce cosmétique", {
          status: 404,
        });
      }

      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async unequipCosmetic(req: Request) {
    try {
      const { idCosmetic }: OwnedEquipDto = await req.json();
      const userId = new URL(req.url).searchParams.get("userId");

      if (
        idCosmetic &&
        typeof idCosmetic === "number" &&
        userId &&
        typeof userId === "string"
      ) {
        await this.ownedBusinessLogic.unequipCosmetic(
          userId as IdUser,
          idCosmetic as IdCosmetic
        );
        return new NextResponse(
          JSON.stringify({ message: "Cosmétique déséquipé" }),
          { status: 200 }
        );
      } else {
        return new NextResponse("Les paramètres sont invalides", {
          status: 400,
        });
      }
    } catch (err) {
      console.error(err);

      if (err instanceof CosmeticNotFoundBusinessLogic) {
        return new NextResponse("Vous ne possédez pas ce cosmétique", {
          status: 404,
        });
      }

      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }
}
