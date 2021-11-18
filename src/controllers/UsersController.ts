// @ts-ignore
import Axios from '/axios_settings';



export class UsersController{
    public static async GetNames() {
        return Axios.get("/api/Users/GetNames")
    }

    public static async GetAll() {
        return Axios.get("/api/Users/GetAll")
    }

    public static async Add(model: object) {
        return Axios.post("/api/Users/register", model)
    }

    public static async Edit(model : object) {
        return Axios.post("/api/Users/Update", model)
    }

    public static async SetPassword(model : object) {
        return Axios.post("/api/Users/SetPassword", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Users/Remove?id=" + id)
    }
}
