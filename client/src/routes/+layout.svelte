<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		Avatar,
		Drawer,
		LightSwitch,
		storePopup,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	import { fly, slide } from 'svelte/transition';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { initializeStores } from '@skeletonlabs/skeleton';
	import { quadInOut } from 'svelte/easing';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerSettings: DrawerSettings = {
		width: 'w-[250px]',
		rounded: 'rounded-l'
	};

	const drawer = getDrawerStore();

	function drawerOpen(): void {
		drawer.open(drawerSettings);
	}

	let sideBarOpen = true;
</script>

<Drawer>
	<Navigation />
</Drawer>

<div class="flex flex-col h-full w-full">
	<div class="flex-none">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="10" />
							<rect y="30" width="100" height="10" />
							<rect y="60" width="100" height="10" />
						</svg>
					</span>
				</button>
				<button
					class="hidden md:block btn btn-sm mr-4"
					on:click={() => (sideBarOpen = !sideBarOpen)}
				>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="10" />
							<rect y="30" width="100" height="10" />
							<rect y="60" width="100" height="10" />
						</svg>
					</span>
				</button>
				<strong class="text-xl">e-Bakuna</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Avatar
					src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					initials="OG"
					width="w-8"
				/>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</div>
	<div class="flex-1 flex">
		{#if sideBarOpen}
			<aside
				transition:slide={{ duration: 200, axis: 'x', easing: quadInOut }}
				class="sidebar flex-none w-[250px] hidden md:block bg-surface-500/10"
			>
				<div
					transition:fly={{ x: -150 }}
					class="overflow-hidden scroll-smooth overflow-y-auto h-[calc(100vh-64px)]"
				>
					<Navigation />
				</div>
			</aside>
		{/if}
		<main
			class="flex-1 overflow-hidden scroll-smooth overflow-y-auto h-[calc(100vh-64px)]"
			style="scrollbar-gutter: auto;"
		>
			<slot />
		</main>
	</div>
</div>
