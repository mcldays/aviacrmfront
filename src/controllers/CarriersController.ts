// @ts-ignore
import Axios from '/axios_settings';



export class CarriersController{
    public static async GetAll() {
        return Axios.get("/api/Carriers/GetAll")
    }

    public static async Add(model: object) {
        return Axios.post("/api/Carriers/Add", model)
    }

    public static async Edit(model : object) {
        return Axios.post("/api/Carriers/Update", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Carriers/Remove?id=" + id)
    }
}
