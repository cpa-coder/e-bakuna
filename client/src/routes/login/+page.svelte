<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	import Password from '$lib/components/Password.svelte';

	let isFocused: boolean = true;

	let username = '';
	let password = '';
	let errorMessage = '';

	$: {
		if (username !== '' || password !== '') {
			errorMessage = '';
		}
	}

	$: disableSubmit = username === '' || password === '';

	function handleSubmit() {
		if (username === '' || password === '') {
			errorMessage = 'Please enter both username and password';
		} else {
			alert('Welcome '.concat(password) + '!');
		}
	}
</script>

<main class="flex justify-center py-8 px-2">
	<form use:focusTrap={isFocused} class="flex flex-col card bg-initial m-4 p-8 w-80">
		<h1 class="text-xl font-bold text-center mb-2">Welcome</h1>
		<label class="label mb-2">
			<span class="label-text">Username</span>
			<input
				type="text"
				placeholder="username"
				bind:value={username}
				class="input input-bordered"
			/>
		</label>
		<label class="label mb-2" for="password">
			<span class="label-text">Password</span>
			<Password id="password" bind:value={password} />
		</label>
		<button
			disabled={disableSubmit}
			type="submit"
			on:click={handleSubmit}
			class="btn variant-filled-primary mt-4"
		>
			Login
		</button>
		<span class="text-red-500 my-2">{errorMessage}</span>
	</form>
</main>
