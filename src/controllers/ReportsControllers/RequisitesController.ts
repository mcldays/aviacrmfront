// @ts-ignore
    import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {RequisitesModel} from "@/models/reports/RequisitesModel";
// Axios.defaults.baseURL = 'http://89.108.103.251';
export class RequisitesController {

    public GetAllReq() : AxiosPromise<RequisitesModel[]> {
        let response = Axios.get("api/requisites/get")
        return response
    }
    public async UpdateReq(model : RequisitesModel){
        return Axios.post("/api/requisites/update", model)
    }
}

