import { alreadyLogInAlert } from "../../../utils/alert";
import { isLoggedIn } from "../../../utils/auth";
import { redirect } from "@sveltejs/kit";

export async function load(){
    if (await isLoggedIn()){
        alreadyLogInAlert()
        throw redirect(301, "/")
    }
}