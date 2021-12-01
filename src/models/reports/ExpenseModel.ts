import {PlaceModel} from "@/models/transportations/PlaceModel";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {CarrierModel} from "@/models/transportations/CarrierModel";
import {AgentModel} from "@/models/transportations/AgentModel";
import {BankReportsModel} from "@/models/reports/BankReportsModel";

export  class ExpenseModel {
    id?: number
    number: string = ''
    created: string
    dateFrom: string
    banksReportId: number
    banksReport: BankReportsModel
    sign: boolean
    cur: string
    sum: number
    correction: string = ''
}
