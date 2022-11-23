import type { Actions } from "./$types";

export const actions: Actions = {
    verify: async(event) => {
        console.log(Object.fromEntries((await event.request.formData()).entries()))
    }
};