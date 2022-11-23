import lucia from "lucia-auth";
import adaptMG from "@lucia-auth/adapter-mongoose";
import mg, { db } from "./db";

const auth = lucia({
    adapter: adaptMG(mg),
    env: import.meta.env.DEV?"DEV":"PROD",
    async transformUserData(userData) {
        const user = await db.user.findById(userData.id).populate('plots').exec()
        return {
            userId: userData.id,
            username: user.provider_id.split(':')[1],
            handle: userData.displayName,
            coins: user.coins,
            verified: user.verified,
            plots: user.verified?user.plots:[]
        }
    },
})

export default auth
type Auth = typeof auth

export {
    type Auth,
    auth
}