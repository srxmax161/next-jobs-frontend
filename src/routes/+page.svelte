<script>
	export let data;
    import humanize from 'humanize-plus'
</script>

<!--create header with xl font size and bold font at the center of the page-->
<h1 class="text-center text-xl font-bold display-flex align-middle">Find Your Next Job</h1>


<!--allows the class to have a up and down scroll feature if content is overflowed while setting the width to 100%-->
<div class="overflow-x-auto w-full">
	<!--creating a loop with the data being jobs-->
	{#each data.jobs as job}
		<!--allows class to have a flexible length with a flexible comlumn with the top margin set at 40%-->
		<div class="flex flex-col mt-10 ml-5 mr-5">
			<div>
				<!--prints out job title with 2xl font size and bold fonts-->
				<a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>

				<!--prints out job employer name, job location and salary range at a small font with top margin set at 4px-->
				<div class="text-sm mt-1">
					{job.employer} . {job.location} .
					<span class="text-sm"
						>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span
					>
				</div>

				<!--prints out date of job posting created with extra small font size with italic font at .5% opacity and top margin being 8px-->
				<div class="italic text-xs opacity-50 mt-2">
					posted {new Date(job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
			</div>

			<!--prints out job description with top margin being 16px-->
			<div class="mt-4">
				{job.description.slice(0, 240)}...
			</div>
		</div>
	{/each}
</div>
