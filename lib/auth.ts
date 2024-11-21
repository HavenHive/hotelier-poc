import { sendResetPassword, sendVerificationOTP } from "@/actions/mail";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP, organization } from "better-auth/plugins";
import prisma from "./db";
import { env } from "./env";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }, request) => {
			await sendResetPassword(user.name, url, user.email);
		},
	},
	plugins: [
		organization(),
		admin(),
		emailOTP({
			async sendVerificationOTP({ email, otp }) {
				sendVerificationOTP(otp, email);
			},
		}),
		nextCookies(),
	],
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
});
