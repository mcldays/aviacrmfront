// @ts-ignore
import Axios from '/axios_settings';
import {AgentModel} from "@/models/transportations/AgentModel";

export class AutController{

public static async Autorization(login : string, password : string){
    return Axios.post(`/api/authenticate/login`, {username : login, password : password})
    }


}
