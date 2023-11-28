<script lang="ts">
	import './styles.css';
	import { onMount } from 'svelte';
	import { Icon } from '@smui/common';
	import { mdiMenu, mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';

	let topAppBar: TopAppBar;

	let darkTheme: boolean = false;

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');

		if (storedTheme === 'dark') {
			darkTheme = true;
		} else {
			darkTheme = false;
		}
	});

	function storeTheme(isDark: boolean) {
		const params = isDark ? 'dark' : 'light';
		darkTheme = isDark;
		localStorage.setItem('theme', params);
	}
</script>

<svelte:head>
	{#if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton>
				<Icon tag="svg" viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiMenu} />
				</Icon>
			</IconButton>
			<Title>E-Bakuna</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton on:click={() => storeTheme(!darkTheme)}>
				<Icon tag="svg" viewBox="0 0 24 24">
					<path
						id="theme-toggler-icon"
						fill="currentColor"
						d={darkTheme ? mdiWhiteBalanceSunny : mdiWeatherNight}
					/>
				</Icon>
			</IconButton>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>
