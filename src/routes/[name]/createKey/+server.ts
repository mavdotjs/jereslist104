import { PRIVATE_ABLY } from '$env/static/private'
import ably from 'ably'
import { nanoid } from 'nanoid'
import type { RequestHandler } from './$types'

export let GET: RequestHandler = ({ params }) => {
    const client = new ably.Rest({
        key: PRIVATE_ABLY
    })
    client.channels.get(`user:${params.name}`).publish('set', nanoid(5))
    return new Response("OK")
}