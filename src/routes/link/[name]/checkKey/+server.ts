import { PRIVATE_ABLY } from '$env/static/private'
import ably from 'ably'
import type { RequestHandler } from './$types'

const useragent = /diamondfire\/(?<version>[0-9]+\.[0-9]+) \((?<plot>[0-9]+), (?<owner>[A-Z]+)\)/i

/**
 * 
 * @param request The original request object
 * @returns if the user agent is valid and can be trusted or not
 */
function checkuseragent(request: Request): boolean {
    const match = request.headers.get('user-agent')?.match(useragent)
    if(!(match && match.groups)) return false
    if(match.groups.plot !== "13570") return false
    if(match.groups.owner !== "MaverickQuill") return false
    return true
}

export let POST: RequestHandler = async ({ params, request }) => {
    if(!checkuseragent(request)) return new Response("OK") // ignore request because its probably invalid
    const client = new ably.Rest({
        key: PRIVATE_ABLY
    })
    client.channels.get(`user:${params.name}`).publish('try', await request.text())
    return new Response("OK")
}