<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getUserId } from '../../../utils/auth.js';
	import { createJobAlert, showJobAlert, warningAlert } from '../../../utils/alert.js';
	import { statusSpinner } from '../../../components/spinner.js';
	import Spinner from '../../../components/Spinner.svelte';

	let formErrors = {};


	function afterPostjobs() {
		goto('/');
		createJobAlert();
	}


	async function inputform(evt) {
		evt.preventDefault();
		const getLocalData = getUserId();

		const inputData = {
			user: getLocalData,
			title: evt.target['title'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			employer: evt.target['employer'].value,
			location: evt.target['location'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirements'].value,
			applicationInstructions: evt.target['applicationInstructions'].value
		};


		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records ', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputData)
		});

		if (resp.status === 200) {
			statusSpinner.set(false)
			warningAlert.set(false)
			afterPostjobs();
		} else {
			statusSpinner.set(false)
			showJobAlert();
		}
	}
</script>

<h1 class="text-center text-3xl font-bold display-flex align-middle">POST JOBS</h1>
<div>
	<form on:submit={inputform}>
		<div class="form-control w-full left px-36">
			<label class="label" for="job title">
				<span class="label-text">Job Title</span>
			</label>
			<input
				type="text"
				name="title"
				placeholder="Please input your job title"
				class="input input-bordered w-full"
				required
			/>
			{#if 'title' in formErrors}
			<label class="label" for="title">
				<span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="minAnnualCompensation">
				<span class="label-text">Minimum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="minAnnualCompensation"
				placeholder="Please input your minimum annual compensation"
				class="input input-bordered w-full"
				required
			/>
			{#if 'minAnnualCompensation' in formErrors}
			<label class="label" for="minAnnualCompensation">
				<span class="label-text-alt text-red-500"
					>{formErrors['minAnnualCompensation'].message}</span
				>
			</label>
		{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="maxAnnualCompensation">
				<span class="label-text">Maximum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="maxAnnualCompensation"
				placeholder="Please input your maximum annual compensation"
				class="input input-bordered w-full"
				required
			/>
			{#if 'maxAnnualCompensation' in formErrors}
					<label class="label" for="maxAnnualCompensation">
						<span class="label-text-alt text-red-500"
							>{formErrors['maxAnnualCompensation'].message}</span
						>
					</label>
				{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="employer">
				<span class="label-text">Company Name</span>
			</label>
			<input
				type="text"
				name="employer"
				placeholder="Please input your company name"
				class="input input-bordered w-full"
				required
			/>
			{#if 'employer' in formErrors}
					<label class="label" for="employer">
						<span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
					</label>
				{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="location">
				<span class="label-text">Job Location</span>
			</label>
			<input
				type="text"
				name="location"
				placeholder="Please input your job location"
				class="input input-bordered w-full"
				required
			/>
			{#if 'location' in formErrors}
					<label class="label" for="location">
						<span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
					</label>
				{/if}
		</div>
		<div class="form-control w-full px-36 mt-5">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea
				type="text"
				name="description"
				placeholder="Please input your job description"
				class="textarea textarea-bordered w-full h-56"
				required
			/>
			{#if 'description' in formErrors}
			<label class="label" for="description">
				<span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w-full px-36 mt-5">
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<input
				type="text"
				name="requirements"
				placeholder="Please input your job requirements"
				class="input input-bordered w-full"
				required
			/>
			{#if 'requirement' in formErrors}
			<label class="label" for="requirement">
				<span class="label-text-alt text-red-500">{formErrors['requirement'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="applicationInstructions">
				<span class="label-text">Applicaiton Instructions</span>
			</label>
			<input
				type="text"
				name="applicationInstructions"
				placeholder="Please input your application instructions"
				class="input input-bordered w-full"
				required
			/>
			{#if 'applicationinstructions' in formErrors}
					<label class="label" for="applicationinstructions">
						<span class="label-text-alt text-red-500">{formErrors['applicationinstructions'].message}</span>
					</label>
				{/if}
		</div>
		<div class="form-control w-full px-36 mt-5 mb-5">
            <button class="btn text 3xl"><Spinner/>POST JOB</button>
		</div>
	</form>
</div>
