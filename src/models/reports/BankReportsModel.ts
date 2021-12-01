import {PlaceModel} from "@/models/transportations/PlaceModel";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {CarrierModel} from "@/models/transportations/CarrierModel";
import {AgentModel} from "@/models/transportations/AgentModel";

export  class BankReportsModel {
 id?: number = 0
 period?: string
 agent?: AgentModel
 agentId?: number
 carrierId: number
 carrier: CarrierModel
 dateFrom: string
 dateTo: string
 dateMake: string
 rate: number
 isApprovedManager: boolean
 isApprovedAgent: boolean
 transportationModels: TransportationModel[] = []
 transportationsId: number[]
 transportations?: string = ''
}
