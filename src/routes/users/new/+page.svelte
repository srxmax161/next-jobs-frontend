<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from './../../../utils/auth.js';
	import { showLoginAlert, signUpAlert, warningAlert } from '../../../utils/alert.js';
	import Spinner from '../../../components/Spinner.svelte';
	import { statusSpinner } from '../../../components/spinner.js';
	

	let msg = "CREATE AN ACCOUNT";
	let formErrors = {};

	function postSignUp() {
		goto('/');
	}

	async function createUser(evt) {
		msg = "CREATING"
		statusSpinner.set(true);
		evt.preventDefault();

		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			statusSpinner.set(false);
			return;
		}

		const userData = {
			username: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value,
			passwordConfirm: evt.target['password-confirmation'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200) {
			const res = await authenticateUser(userData.username, userData.password);

			if (res.success) {
				statusSpinner.set(false);
				signUpAlert();
				postSignUp();
			} else {
				statusSpinner.set(false);
				showLoginAlert()
				throw 'Sign up succeeded but authentication failed';
			}
		} else {
			statusSpinner.set(false);
			const res = await resp.json();
			formErrors = res.data;
		}
	}
</script>
<svelte:head>
	<title>Next Jobs | Sign Up</title>
</svelte:head>

<div class="mx-auto my-10 bg-neutral rounded-box max-w-lg py-10 ease-in duration-200 shadow-2xl">
	<div class="prose mx-auto text-center ">
		<h1 class=" text-xl">Create an Account to Post a Job</h1>
			<a
				class="link-hover italic text-xs"
				href="../../users/login"
				on:click={() => warningAlert.set(false)}
				>Already have an account? Click here to login instead.</a
			>
	</div>
	<div class="flex justify-center items-center mt-8">
		<form on:submit={createUser} class="w-full mx-10">
			<div class="form-control w-full">
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder="johndoe"
					class="input input-bordered w-full"
				/>
				{#if 'username' in formErrors}
					<label class="label" for="username">
						<span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					name="email"
					placeholder="job@example.com"
					class="input input-bordered w-full"
					required
				/>
				{#if 'email' in formErrors}
					<label class="label" for="email">
						<span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder="Create Password"
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Confirm Password</span>
				</label>
				<input
					type="password"
					name="password-confirmation"
					placeholder="Confirm Password"
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full mt-10">
				<button class="btn btn-md btn-primary"><Spinner/>Create an Account</button>
			</div>
		</form>
	</div>
</div>


