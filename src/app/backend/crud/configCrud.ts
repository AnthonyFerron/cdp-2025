import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default class ConfigCrud {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
}
