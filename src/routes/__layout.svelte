<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { isInCSRMode, urlStore, userComponent, userLoad } from '$lib/stores';
	import { navigating } from '$app/stores';
	import { browser } from '$app/env';

	// 1/ Nice trick to know if we are in SSR mode or CSR Mode
	if (browser) {
		addEventListener('sveltekit:start', () => {
			$isInCSRMode = true;
		});
	}

	// 2/ Nice trick to be able to know if isPrefetch or not in loads
	beforeNavigate(({ to }) => {
		console.log('beforeNavigate');
		$urlStore = to?.href ?? null;
	});
	afterNavigate(({ to }) => {
		console.log('afterNavigate');
	});

	$: console.log($navigating);
</script>

<nav>
	<ul>
		<li>
			<a sveltekit:prefetch href="/">Home</a>
			<a sveltekit:prefetch href="/user-1">User 1</a>
			<a sveltekit:prefetch href="/user-2">User 2</a>
			<a href="/user-3">User 3 (no prefetch)</a>
		</li>
	</ul>
</nav>

<hr />
<p>
	userLoad : {$userLoad}
</p>
<p>
	userComp : {$userComponent}
</p>

<hr />

<slot />
