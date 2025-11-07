import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default class ConfigCrud {
    private static _instance: PrismaClient;

    protected get prisma(): PrismaClient {

      if (!ConfigCrud._instance) {
        ConfigCrud._instance = prisma;
      }
      return ConfigCrud._instance;
    }
}
