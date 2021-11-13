// @ts-ignore
import Axios from '/axios_settings';



export class FeesController{
    public static async GetAll() {
        return Axios.get("/api/Fees/GetAll")
    }

    public static async GetByCarrierId(id: number) {
        return Axios.get("/api/Fees/GetByCarrierId?id=" + id)
    }

    public static async Add(model: object) {
        return Axios.post("/api/Fees/Add", model)
    }

    public static async Edit(model : object) {
        return Axios.post("/api/Fees/Update", model)
    }

    public static async Remove(id : number) {
        return Axios.get("/api/Fees/Remove?id=" + id)
    }
}
