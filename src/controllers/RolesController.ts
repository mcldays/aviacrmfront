// @ts-ignore
import Axios from '/axios_settings';

export class RolesController{

    public static async GetAll() {
        return Axios.get("/api/Roles/GetAll")
    }

    public static async Edit(model : object) {
        return Axios.post("/api/Roles/Update", model)
    }

    public static async Add(model : object) {
        return Axios.post("/api/Roles/Add", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Roles/Remove?id=" + id)
    }
}
