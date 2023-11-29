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

	import { fade, fly, slide } from 'svelte/transition';
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
	let isDrawerOpen = false;

	drawer.subscribe((value) => {
		isDrawerOpen = value.open ?? false;
	});

	function drawerOpen(): void {
		drawer.open(drawerSettings);
	}

	let sideBarOpen = true;
</script>

<Drawer>
	<div class="px-4 pt-4 flex items-center">
		<img class="m-2 w-8 h-8" src="/favicon.png" alt="logo" />
		<strong class="text-xl">e-Bakuna</strong>
	</div>
	<Navigation />
</Drawer>

<div class="flex h-full">
	{#if sideBarOpen}
		<aside
			transition:slide={{ duration: 200, axis: 'x', easing: quadInOut }}
			class="sidebar w-[250px] hidden md:block bg-surface-500/10"
		>
			<div
				transition:fly={{ x: -150 }}
				class="scroll-smooth overflow-hidden overflow-y-auto h-full"
			>
				<div class="px-4 py-2 flex items-center">
					<img class="m-2 w-8 h-8" src="/favicon.png" alt="logo" />
					<strong class="text-xl">e-Bakuna</strong>
				</div>
				<div>
					<Navigation />
				</div>
			</div>
		</aside>
	{/if}
	<div class="flex-1 flex flex-col h-full">
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
					{#if !sideBarOpen && !isDrawerOpen}
						<div
							in:fly={{ x: -150, duration: 300 }}
							out:fade={{ duration: 300 }}
							class="flex items-center"
						>
							<img class="mr-2 w-8 h-8" src="/favicon.png" alt="logo" />
							<strong class="text-xl">e-Bakuna</strong>
						</div>
					{/if}
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
		<main class="flex-1 scroll-smooth overflow-auto" style="scrollbar-gutter: auto;">
			<slot />
		</main>
	</div>
</div>
