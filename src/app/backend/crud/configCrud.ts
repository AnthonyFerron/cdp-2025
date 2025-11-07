import { PrismaClient } from "@prisma/client";


export default class ConfigCrud {

    prisma: PrismaClient

    constructor() {

        this.prisma = new PrismaClient({
            log: ["error"]
        })
    }
}