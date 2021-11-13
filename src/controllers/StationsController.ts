// @ts-ignore
import Axios from '/axios_settings';



export class StationsController{
    public static async GetAll() {
       return Axios.get("/api/Stations/GetAll")
    }

    public static async Add(model: object) {
       return Axios.post("/api/Stations/Add", model)
    }

    public static async Edit(model : object) {
       return Axios.post("/api/Stations/Update", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Stations/Remove?id=" + id)
    }
}
