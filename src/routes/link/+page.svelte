<script lang=ts>
    export let data: PageData;
    import { PUBLIC_ABLY } from '$env/static/public'
    import type { PageData } from './$types';
    import ably from 'ably/promises'
    import { writable } from 'svelte/store';
    import action from '$lib/action';
    const key = writable()
    const client = new ably.Realtime({
        key: PUBLIC_ABLY
    })
    const channel = client.channels.get(`user:${data._lucia.user.username}`)
    channel.subscribe('set', (e) => {
        if(!e.data) return
        key.set(e.data)
    })
    channel.subscribe('try', async (e) => {
        await action('verify', (await channel.history()).items.map((value) => {
            return `${value.name}|${value.data}`
        }))
    })
    async function getKey() {
        await fetch(document.location + '/createKey', {
            method: "GET"
        })
    }
</script>
{#if data.searchQuery.isAuth !== undefined}
    <span class="text-red-200">You cannnot access this page without verifying your account!</span>
{/if}
<button on:click={getKey}>Get key</button>
{$key}