import {CarrierModel} from "./CarrierModel"
import {AgentModel} from "./AgentModel";
import {AirportModel} from "./AirportModel"
import {PlaceModel} from "./PlaceModel"
import {CarrierPriceModel} from "./CarrierPriceModel";

export default class NewTransportationModel {
    Carrier : CarrierModel
    Number : number
    DateAN : string
    DateOfLeave : string
    Agent : AgentModel
    AirportFromId : AirportModel
    GoodsNatureCode : string
    GoodsNatureDescription : string
    AirportToId : AirportModel
    AgentsCommission : string
    FZPrice : string
    Fio : string
    Email : string
    FlightCode : string
    ArrivalGeneral : boolean
    Emergency : boolean
    Places  : PlaceModel[]
    CarrierPrice : CarrierPriceModel
    AgentPrice : CarrierPriceModel
}
