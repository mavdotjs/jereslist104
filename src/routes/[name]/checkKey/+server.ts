import { PRIVATE_ABLY } from '$env/static/private'
import ably from 'ably'
import type { RequestHandler } from './$types'

export let POST: RequestHandler = async ({ params, request }) => {
    const client = new ably.Rest({
        key: PRIVATE_ABLY
    })
    client.channels.get(`user:${params.name}`).publish('try', await request.text())
    return new Response("OK")
}