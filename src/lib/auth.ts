import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
  },

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/backend/api/auth",

  plugins: [nextCookies()],
});
