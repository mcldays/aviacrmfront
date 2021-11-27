import {PlaceModel} from "@/models/transportations/PlaceModel";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {CarrierModel} from "@/models/transportations/CarrierModel";

export  class BankReportsModel {

 carrier: CarrierModel
 dateFrom: string
 dateTo: string
 dateMake: string
 rate: number

 transportationModels: TransportationModel[]
}
