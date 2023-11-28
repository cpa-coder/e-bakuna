<script lang="ts">
	import './styles.css';
	import { Icon } from '@smui/common';
	import { mdiMenu, mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';

	let topAppBar: TopAppBar;
	let darkTheme: boolean | undefined = undefined;

	if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
		const storedTheme = localStorage.getItem('theme');

		if (storedTheme === null) {
			darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			darkTheme = storedTheme === 'dark';
		}
	}

	function toggleTheme() {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', darkTheme ? 'light' : 'dark');
			darkTheme = !darkTheme;
		}
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
</svelte:head>
<div class="app-transition">
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
				<IconButton on:click={toggleTheme}>
					<Icon tag="svg" viewBox="0 0 24 24">
						<path fill="currentColor" d={darkTheme ? mdiWhiteBalanceSunny : mdiWeatherNight} />
					</Icon>
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<slot />
	</AutoAdjust>
</div>

<style>
	.app-transition {
		transition: all 0.2s ease-in-out;
	}
</style>
