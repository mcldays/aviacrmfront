// @ts-ignore
import Axios from '/axios_settings';
import {RequisitesModel} from "@/models/reports/RequisitesModel";

export class RequisitesController{

    public static async GetAll(id: '0') {
        return Axios.get("/api/Requisites/Get")
    }


    public static async Add(model : RequisitesModel) {
        return Axios.post("/api/Requisites/Add", model)
    }

    public static async Edit(model : RequisitesModel) {
        return Axios.post("/api/Requisites/Update", model)
    }
}
