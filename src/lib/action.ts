export default async function action(actionname: string = "", data: Record<string|number, string> | Array<string>): Promise<Response | void> {
    const url = new URL(document.URL)
    if(actionname) url.searchParams.set(`/${actionname}`, "")
    return await fetch(url, {
        method: "POST",
        body: new URLSearchParams(Object.entries(data)).toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-sveltekit-action": "true"
        }
    })
}