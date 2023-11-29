<script lang="ts">
	export let id = '';
	export let value = '';
	export let placeholder = 'password';
	import Icons from '$lib/components/Icons.svelte';

	let showPassword = false;
	$: type = showPassword ? 'text' : 'password';

	// @ts-ignore
	function onInput(event) {
		value = event.target.value;
	}
</script>

<div class="input-group grid-cols-[1fr_auto]">
	<input {id} {type} {value} {placeholder} class="input input-bordered" on:input={onInput} />
	<button
		type="button"
		on:click={() => (showPassword = !showPassword)}
		class="btn btn-square btn-ghost"
	>
		{#if showPassword}
			<Icons name="eye-slash" width="1.5rem" height="1.5rem" />
		{:else}
			<Icons name="eye" width="1.5rem" height="1.5rem" />
		{/if}
	</button>
</div>
