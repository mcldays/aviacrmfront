// @ts-ignore
    import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {BankReportsModel} from "@/models/reports/BankReportsModel";
// Axios.defaults.baseURL = 'http://89.108.103.251';
export class ReadyReportsController {

    public GetAll() : AxiosPromise<BankReportsModel[]> {
        let response = Axios.get("api/readyReports/getAll")
        return response
    }
    public async Update(id : number){
        return Axios.get("/api/readyReports/update?ids=" + id)
    }
    public async Add(model : BankReportsModel){
        return Axios.post("/api/readyReports/add", model)
    }
    public async Remove(id : number){
        return Axios.get("/api/readyReports/remove?ids=" + id)
    }
}

