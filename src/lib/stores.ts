import { writable } from "svelte/store";

export let userLoad = writable<string>("load");

export let userComponent = writable<string>("Component");

export let userToDisplay = writable<string | null>(null);

export let urlStore = writable<string | null>(null);

// Are we doing only client side navigation now?
export let isInCSRMode = writable<boolean>(false);