import {
	adminClient,
	emailOTPClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({
	plugins: [adminClient(), emailOTPClient(), organizationClient()],
});

export const {
	useActiveMember,
	useActiveOrganization,
	useListOrganizations,
	useSession,
	deleteUser,
	updateUser,
	signIn,
	signOut,
	signUp,
	sendVerificationEmail,
	getSession,
	linkSocial,
	listSessions,
	revokeSession,
	revokeSessions,
	revokeOtherSessions,
	admin,
	listAccounts,
	changeEmail,
	changePassword,
	emailOtp,
	verifyEmail,
	forgetPassword,
	organization,
	resetPassword,
} = authClient;
