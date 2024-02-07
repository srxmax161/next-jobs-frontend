import { isLoggedIn, loggedIn } from "../../../utils/auth";
import { logInAlert } from '../../../utils/alert'
import { redirect } from "@sveltejs/kit";

export async function load(){
    if (!(await isLoggedIn())){
        logInAlert()
        throw redirect(301, '/login')
    }
}
