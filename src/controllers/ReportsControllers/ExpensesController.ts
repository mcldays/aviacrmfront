// @ts-ignore
    import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {ExpenseModel} from "@/models/reports/ExpenseModel";
// Axios.defaults.baseURL = 'http://89.108.103.251';
export class ExpensesController {

    public GetAll() : AxiosPromise<ExpenseModel[]> {
        let response = Axios.get("api/expenses/getAll")
        return response
    }
    public async Update(id : number){
        return Axios.get("/api/expenses/update?ids=" + id)
    }
    public async Add(model : ExpenseModel){
        return Axios.post("/api/expenses/add", model)
    }
    public async Remove(id : number){
        return Axios.get("/api/expenses/remove?ids=" + id)
    }
}

