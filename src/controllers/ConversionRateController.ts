// @ts-ignore
import Axios from '/axios_settings';
import {ConversionRateModel} from "@/models/conversionrates/ConversionRateModel";

export class ConversionRateController{
    public static async GetAllRates() {
       return Axios.get("/api/ConversionRates/GetAll")
    }

    public static async AddRate(model : ConversionRateModel) {
       return Axios.post("/api/ConversionRates/Add", model)
    }

    public static async EditRate(model : ConversionRateModel) {
       return Axios.post("/api/ConversionRates" +
           "/Update", model)
    }

    public static async RemoveRate(id : number) {
       return Axios.get("/api/ConversionRates/Remove?id=" + id)
    }
}
