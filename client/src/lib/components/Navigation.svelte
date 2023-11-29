<script lang="ts">
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawer = getDrawerStore();

	$: activeClass = (href: string) => ($page.url.pathname === href ? 'bg-primary-500' : '');
</script>

<nav class="list-nav p-4">
	<ul>
		<li>
			<a on:keypress on:click={drawer.close} href="/" class={activeClass('/')}> Home </a>
		</li>
		<li>
			<a on:keypress on:click={drawer.close} href="/company" class={activeClass('/company')}>
				Company
			</a>
		</li>
		<li>
			<a on:keypress on:click={drawer.close} href="/account" class={activeClass('/account')}>
				Account
			</a>
		</li>
		<li>
			<a
				on:keypress
				on:click={drawer.close}
				href="/account/add"
				class={activeClass('/account/add')}
			>
				Add Account
			</a>
		</li>
	</ul>
</nav>
