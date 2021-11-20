// @ts-ignore
import Axios from '/axios_settings';

export class ConversionRateController{

    public static async GetAll() {
       return Axios.get("/api/ConversionRates/GetAll")
    }

    public static async Add(model : any) {
       return Axios.post("/api/ConversionRates/Add", model)
    }
    //
    // public static async Edit(model : any) {
    //    return Axios.post("/api/ConversionRates/Update", model)
    // }

    public static async Remove(id : number) {
       return Axios.get("/api/ConversionRates/Remove?id=" + id)
    }
}
