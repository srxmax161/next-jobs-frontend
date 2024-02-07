<script>
    import Themes from "./Themes.svelte";
    import { loggedIn } from "../utils/auth.js";
    import { logOut } from "../utils/auth.js";
</script>

<nav class="flex justify-between mt-5 px-3">
	<div>
		<button class="btn">
			<a href="/">DATABASE</a>
		</button>
	</div>
    <div class="flex justify-between">
		<Themes/>
		<div>
		{#if $loggedIn == false}	
			<button class="btn">
				<a href="/users/new">SIGNUP</a>
			</button>
			<button class="btn">
				<a href="/login">LOG IN</a>
			</button>
		{:else}
			<button class="btn">
				<a href="/jobs/new">POST JOBS</a>
			</button>
			<button class="btn" on:click={logOut}>
				<a href="/">LOG OUT</a>
			</button>
		{/if}
		</div>
	</div>
</nav>