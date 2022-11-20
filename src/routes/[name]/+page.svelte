<script>
    export let data;
    import { PUBLIC_ABLY } from '$env/static/public'
    import ably from 'ably'
    import { writable } from 'svelte/store';
    const key = writable()
    const client = new ably.Realtime({
        key: PUBLIC_ABLY
    })
    const channel = client.channels.get(`user:${data.name}`)
    channel.subscribe('set', (e) => {
        if(!e.data) return
        // console.log(e.data, 'client')
        key.set(e.data)
    })
    async function getKey() {
        await fetch(document.location + '/createKey', {
            method: "GET"
        })
    }
</script>

<button on:click={getKey}>Get key</button>
{$key}