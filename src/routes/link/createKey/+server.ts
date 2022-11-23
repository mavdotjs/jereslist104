import { PRIVATE_ABLY } from '$env/static/private'
import ably from 'ably'
import { nanoid } from 'nanoid'
import type { RequestHandler } from './$types'

export let GET: RequestHandler = async ({ params, locals }) => {
    const client = new ably.Rest({
        key: PRIVATE_ABLY
    })
    const user = (await locals.getSessionUser()).user
    client.channels.get(`user:${(await user).username}`).publish('set', nanoid(5))
    return new Response("OK")
}