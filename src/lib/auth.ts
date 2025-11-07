import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Réinitialisation de mot de passe</h1>
            <p>Bonjour ${user.name},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour continuer :</p>
            <a href="${url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Réinitialiser mon mot de passe
            </a>
            <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
            <p style="color: #666; font-size: 14px;">Ce lien expire dans 1 heure.</p>
          </div>
        `,
      });
    },
  },

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/backend/api/auth",

  user: {
    additionalFields: {
      id_country: {
        type: "number",
        required: true,
        defaultValue: 1,
      },
      experience: {
        type: "number",
        required: true,
        defaultValue: 0,
      },
      levels: {
        type: "number",
        required: true,
        defaultValue: 1,
      },
      coins: {
        type: "number",
        required: true,
        defaultValue: 0,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "USER",
      },
    },
  },

  plugins: [nextCookies()],
});
