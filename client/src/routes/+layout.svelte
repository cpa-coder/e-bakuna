<script lang="ts">
	import './styles.css';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { Icon } from '@smui/common';
	import { mdiMenu, mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';

	let topAppBar: TopAppBar;

	let darkTheme: boolean | undefined = undefined;
	let themeIcon: string;

	$: {
		themeIcon = darkTheme ? mdiWhiteBalanceSunny : mdiWeatherNight;
	}

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');

		if (storedTheme === null) {
			darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			darkTheme = storedTheme === 'dark';
		}
	});

	function updateTheme() {
		darkTheme = !darkTheme;
		localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
	}
</script>

<svelte:head>
	{#if darkTheme === undefined}
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
	<script src="/startup.js"></script>
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
			<IconButton on:click={updateTheme}>
				<Icon tag="svg" viewBox="0 0 24 24">
					<path fill="currentColor" d={themeIcon} />
				</Icon>
			</IconButton>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>
