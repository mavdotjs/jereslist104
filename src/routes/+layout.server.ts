import auth from "$lib/auth";
import { handleServerSession } from "@lucia-auth/sveltekit";
import type { LayoutServerLoad } from "./$types";

// export const load: LayoutServerLoad = handleServerSession(); // results in error

export const load: LayoutServerLoad = async (e) => {
    const data = await (handleServerSession())(e)
    data._lucia.user = await data._lucia.user
    return data
}