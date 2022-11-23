import type { PageLoad } from "./$types";
export let load: PageLoad = ({ params, url }) => {
    return {
        params,
        searchQuery: JSON.parse(JSON.stringify(Object.fromEntries(url.searchParams)))
    }
}