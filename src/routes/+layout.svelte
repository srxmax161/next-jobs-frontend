<script>
import '../app.css';
import Header from '../components/Header.svelte';
import Alerts from '../components/Alerts.svelte';
import NewAlerts from '../components/NewAlerts.svelte';
  

	// let isLoggedIn;

	// loggedIn.subscribe(value => {
	//   isLoggedIn = value;
	// });
</script>

<Header/>
<!-- so it can be used on all pages -->
<Alerts/>
<NewAlerts/>
<slot />
