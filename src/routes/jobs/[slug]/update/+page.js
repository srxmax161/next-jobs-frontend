import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { logInAlert, notJobCreaterAlert } from '../../../../utils/alert';
import { getUserId, isLoggedIn, loggedIn } from '../../../../utils/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
 
  if(!(await isLoggedIn())){
    logInAlert()
    throw redirect(307, '/login')
  }
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  const res = await resp.json();
  if (resp.status == 200) {
    if (res.user !=getUserId()){
      notJobCreaterAlert()
      throw redirect(302, '/')
    }
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}