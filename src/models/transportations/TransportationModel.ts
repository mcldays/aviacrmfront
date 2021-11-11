import {CarrierModel} from "./CarrierModel"
import {AgentModel} from "./AgentModel";
import {AirportModel} from "./AirportModel"
import {PlaceModel} from "./PlaceModel"
import {CarrierPriceModel} from "./CarrierPriceModel";

export  class TransportationModel {
    id:  number
    carrier : CarrierModel
    number : number
    dateAN : string
    dateOfLeave : string
    agent : AgentModel
    agentId : number
    airportFromId : AirportModel
    goodsNatureCode : string
    goodsNatureDescription : string
    airportToId : AirportModel
    agentsCommission : string
    fzPrice : string
    fio : string
    email : string
    flightCode : string
    arrivalGeneral : boolean
    emergency : boolean
    places  : PlaceModel[]
    totalWeight? : number
    totalSeats? : number
    carrierPrice : CarrierPriceModel
    agentPrice : CarrierPriceModel
}
