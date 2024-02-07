<script>
    import { PUBLIC_BACKEND_BASE_URL} from '$env/static/public'
    import { goto } from '$app/navigation'
    import { getUserId, getTokenFromLocalStorage } from '../../../../utils/auth';
	import { statusSpinner } from '../../../../components/spinner';
	import Spinner from '../../../../components/Spinner.svelte';
	import { showEditAlert, warningAlert } from '../../../../utils/alert';

	export let data

    let formErrors = {}

    function afterUpdateJobs(){
        goto(`/jobs/${data.job.id}`)
    }

    async function updateJobs(evt) {
		statusSpinner.set(true)
        evt.preventDefault() 
		// formErrors = {};
		// if (evt.target['minAnnualCompensation'].value < 1000){
		// 	formErrors['minAnnualCompensation'] = { message: 'Must be larger than 1000.00'}
		// }
		// if (evt.target['maxAnnualCompensation'].value < 1000) {
		// 	formErrors['maxAnnualCompensation'] = { message: 'Must be larger than 1000.00' };
		// }
		// if (evt.target['appinstruction'].value.length < 10) {
		// 	formErrors['appinstruction'] = { message: 'Must have at least 10 characters' };
		// }


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

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
			},
			body: JSON.stringify(inputData)
		});

		if (resp.status === 200) {
			warningAlert.set(false)
			statusSpinner.set(false)
			afterUpdateJobs();
		} else {
			statusSpinner.set(false)
			showEditAlert()
		}
    }
</script>

<h1 class="text-center text-3xl font-bold display-flex align-middle">POST JOBS</h1>
<div>
	<form on:submit={updateJobs}>
		<div class="form-control w-full left px-36 mt-5">
			<label class="label" for="job title">
				<span class="label-text">Job Title</span>
			</label>
			<input
				type="text"
				name="title"
				bind:value={data.job.title}
				class="input input-bordered w-full"
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="minAnnualCompensation">
				<span class="label-text">Minimum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="minAnnualCompensation"
				bind:value={data.job.minAnnualCompensation}
				class="input input-bordered w-full"
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="maxAnnualCompensation">
				<span class="label-text">Maximum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="maxAnnualCompensation"
				bind:value={data.job.maxAnnualCompensation}
				class="input input-bordered w-full"
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="employer">
				<span class="label-text">Company Name</span>
			</label>
			<input
				type="text"
				name="employer"
				bind:value={data.job.employer}
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
				bind:value={data.job.location}
				class="input input-bordered w-full"
				required
			/>
			{#if 'location' in formErrors}
			<label class="label" for="location">
				<span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea
				type="text"
				name="description"
				bind:value={data.job.description}
				class="textarea textarea-bordered w-full h-56"
				required
			/>
			{#if 'description' in formErrors}
			<label class="label" for="description">
				<span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<input
				type="text"
				name="requirements"
				bind:value={data.job.requirements}
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
				<span class="label-text">Application Instructions</span>
			</label>
			<input
				type="text"
				name="applicationInstructions"
				bind:value={data.job.applicationInstructions}
				class="input input-bordered w-full"
				required
			/>
			{#if 'appinstruction' in formErrors}
			<label class="label" for="appinstruction">
				<span class="label-text-alt text-red-500">{formErrors['appinstruction'].message}</span>
			</label>
		{/if}
		</div>
		<div class="form-control w-full px-36 mt-5">
            <button class="btn text 3xl"><Spinner/>UPDATE JOB</button>
		</div>
	</form>
</div>
