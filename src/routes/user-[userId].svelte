<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { navigating } from '$app/stores';
	import { isInCSRMode, urlStore, userComponent, userLoad } from '$lib/stores';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { get } from 'svelte/store';

	export async function load(event: LoadEvent): Promise<LoadOutput<{ userId: string }>> {
		const msg = `load userId: ${event.params.userId}`;

		userLoad.set(event.params.userId);

		const _urlStore = get(urlStore);
		const _isInCSRMode = get(isInCSRMode);

		// 1 to avoid my logic of isInCSRMode, it would be nice to know with event.isInCSRMode?
		// https://github.com/sveltejs/kit/issues/4447

		// 2 Are we in a prefetch or not?
		// We can be in prefetch ONLY if we are already in CSRMode && in the browser && beforeNavigate.to is going to event.url.href
		let isPrefetch = false;
		if (browser && _isInCSRMode) {
			isPrefetch = event.url.href !== _urlStore;
		}

		// With the 2 things above we can await or not things
		// Today if we always await, even in the client side navigation we need to wait for ALL data to come to move to the next page.
		// But if we don't await, we can move to the next page without waiting for all data to come (and maybe stores are already filled!)
		// So will transition is happening, we load the rest of partial data.

		// if (_isInCSRMode) {
		// 	getDataFromServerAndFillAStore(event.params.userId);
		// } else {
		// 	await getDataFromServerAndFillAStore(event.params.userId);
		// }

		console.log({
			msg,
			isPrefetch,
			_isInCSRMode
		});

		return {
			props: {
				userId: event.params.userId
			}
		};
	}
</script>

<script lang="ts">
	export let userId: string;

	$: msg = `Component userId: ${userId}`;
	$: console.log({ msg });
	$: $userComponent = userId;
</script>

<h1>UserId is: {userId}</h1>

<pre>
  <!-- 3 in navigation it would be good to also see if it's coming from a isPrefetch or not -->
  {$navigating}
</pre>
