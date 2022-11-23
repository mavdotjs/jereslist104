import auth from "$lib/auth";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = handleHooks(auth);