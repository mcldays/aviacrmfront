// @ts-ignore
import Axios from '/axios_settings';

export class PersonsController{
    public static async GetAll() {
        return Axios.get("/api/Persons/GetAll")
    }

    public static async Add(model : any) {
        return Axios.post("/api/Persons/Add", model)
    }

    public static async Edit(model : any) {
        return Axios.post("/api/Persons/Update", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Persons/Remove?id=" + id)
    }
}
