import { invalid, redirect } from '@sveltejs/kit';
import auth from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';
import { generateRandomString } from 'lucia-auth'

// export const load: PageServerLoad = async ({ locals }) => {
// 	const session = await locals.getSession();
// 	if (session) throw redirect(302, '/');
// 	return {};
// };

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data: { username: string, handle: string, password: string } = JSON.parse(JSON.stringify(Object.fromEntries(await request.formData())))
		// check for empty values
        if(!data.username || !data.handle || !data.password) return invalid(400, {error: "Empty Field Detected"})
        if(!/[0-z_]+/.test(data.handle)) return invalid(400, {error: "Handle can only contain numbers, letters and underscores"})
        if(data.handle.length > 20 || data.handle.length < 3) invalid(400, {error: "Handle must between 4-20"})

		try {
			const user = await auth.createUser('handle', data.username, {
				password: data.password,
				attributes: {
					displayName: data.handle,
                    _id: generateRandomString(19)
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch(e) {
			// username already in use
			return invalid(400);
		}
	}
};