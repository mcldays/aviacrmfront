import {CarrierModel} from "./CarrierModel"
import {AgentModel} from "./AgentModel";
import {AirportModel} from "./AirportModel"
import {PlaceModel} from "./PlaceModel"
import {CarrierPriceModel} from "./CarrierPriceModel";

export  class TransportationModel {
    id:  number
    carrier : CarrierModel
    carrierId? : number
    number : number
    totalValue : number
    dateAN : string
    dateOfLeave : string
    agent : AgentModel
    agentId : number
    airportFromId : number
    airportFrom : any
    goodsNatureCode : string
    goodsNatureDescription : string
    airportToId : number
    airportTo : any
    agentsCommission : number
    fzPrice : number
    fromTo : string
    fio : string
    email : string
    flightCode : string
    arrivalGeneral : boolean
    emergency : boolean
    places  : PlaceModel[]
    totalWeight? : number
    totalSeats? : number
    totalVolume? : number
    position? : number
    isDG? : boolean
    isGeneral? :boolean
    totalRub? : number
    carrierPrice : CarrierPriceModel
    agentPrice : CarrierPriceModel
}


