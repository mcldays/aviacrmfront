// @ts-ignore
import Axios from '/axios_settings';



export class UsersController{
    public static async GetNames() {
        return Axios.get("/api/Users/GetNames")
    }
}
