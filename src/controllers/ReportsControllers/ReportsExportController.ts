// @ts-ignore
import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {BankReportsModel} from "@/models/reports/BankReportsModel";
export class ReportsExportController {

    public GetBank(model : BankReportsModel){

        return Axios.post("/api/ReportsExport/GetBank", model)
    }
    public GetAk(model : BankReportsModel){

        return Axios.post("/api/ReportsExport/GetAk", model)
    }
    public GetStation(model : BankReportsModel){

        return Axios.post("/api/ReportsExport/GetStation", model)
    }
    public GetAgent(model : BankReportsModel){

        return Axios.post("/api/ReportsExport/GetAgent", model)
    }
}

