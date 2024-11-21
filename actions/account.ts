"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

export async function updateName(name: string) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz) return { error: "Unauthorized" };
		const editName = await prisma.user.update({
			where: { id: authz.user.id },
			data: { name },
		});
		if (!editName) return { error: "Failed to update name" };
		return { success: true, message: "Name updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function updateAvatar(url: string) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz) return { error: "unauthorized" };
		const updatedAvatar = await prisma.user.update({
			where: { id: authz.user.id },
			data: { image: url },
		});
		if (!updatedAvatar) return { error: "Failed to update avatar" };
		return { success: true, message: "Avatar updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
