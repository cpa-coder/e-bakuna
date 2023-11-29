<script lang="ts">
	let username = '';
	let password = '';
	let errorMessage = '';

	function handleSubmit() {
		if (username === '' || password === '') {
			errorMessage = 'Please enter both username and password';
		} else {
			// Handle form submission here
		}
	}

	$: {
		if (username !== '' || password !== '') {
			errorMessage = '';
		}
	}
</script>

<main class="flex justify-center py-8 px-2">
	<div class="flex flex-col card bg-initial m-4 p-8 w-80">
		<h1 class="text-xl font-bold text-center">Login</h1>
		<label class="label mb-2">
			<span class="label-text">Username</span>
			<input
				type="text"
				placeholder="username"
				bind:value={username}
				class="input input-bordered"
			/>
		</label>
		<label class="label mb-2">
			<span class="label-text">Password</span>
			<input
				type="password"
				placeholder="password"
				bind:value={password}
				class="input input-bordered"
			/>
		</label>
		<span class="text-red-500">{errorMessage}</span>
		<button on:click={handleSubmit} class="btn variant-filled-primary mt-4">Login</button>
	</div>
</main>
