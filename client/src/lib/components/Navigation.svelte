<script lang="ts">
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawer = getDrawerStore();

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-4">
	<ul>
		<li on:keypress on:click={drawer.close}>
			<a href="/" class={classesActive('/')}>Notes</a>
		</li>
		<li on:keypress on:click={drawer.close}>
			<a href="/?test=1" class={classesActive('/?test=1')}>Notes</a>
		</li>
		<li on:keypress on:click={drawer.close}>
			<a href="/?test=2" class={classesActive('/?test=2')}>Notes</a>
		</li>
	</ul>
</nav>
