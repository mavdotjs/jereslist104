import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async (e) => {
    const data = await e.parent()
    if(!(data._lucia && data._lucia.user)) return
    const { _lucia: { user: { verified, username } } } = data
    if(!verified) throw redirect(302, `/link/${username}?isAuth&ref=${e.url.pathname}`)
}