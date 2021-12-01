// @ts-ignore
import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {ExpenseModel} from "@/models/reports/ExpenseModel";
export class ReportsExportController {

    public Work(model : BankReportsModel, link1 : string, name: string){
        Axios.post(link1, model,
            {
            responseType: 'blob'
        }).then((response: any) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', name+'.xlsx')
            document.body.appendChild(link)
            link.click()
        });
    }
    public GetBank(model : BankReportsModel) {
        this.Work(model,'/api/ReportsExport/GetBank', 'Bank Reports')
    }
    public GetAk(model : BankReportsModel){
        this.Work(model,'/api/ReportsExport/GetAk', 'Carrier Reports')
    }
    public GetStation(model : BankReportsModel){
        this.Work(model,'/api/ReportsExport/GetStation', 'Stations Reports')
    }
    public GetAgent(model : BankReportsModel){
        this.Work(model,'/api/ReportsExport/GetAgent','Agent Reports')
    }
    public GetExpense(model : ExpenseModel){
        Axios.post('/api/ReportsExport/GetExpense', model,
            {
                responseType: 'blob'
            }).then((response: any) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Expense '+model.number+'.xlsx')
            document.body.appendChild(link)
            link.click()
        });
    }
}

