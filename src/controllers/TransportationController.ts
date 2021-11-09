// @ts-ignore
import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {TransportationReadModel} from "@/models/transportations/readmodels/TransportationReadModel";
// Axios.defaults.baseURL = 'http://89.108.103.251';
export class TransportationController {
    public AddNewTransportation(model : TransportationModel) {
       return  Axios.post("/api/transportations/add", model)
}
    public GetAllTransportations() : AxiosPromise<TransportationModel[]> {
        let response = Axios.get("api/transportations/getall")
        return response
    }

    public RemoveTransportationFromId(id : number){
        return Axios.get(`api/transportations/remove?id=${id}`)
    }
    public async UpdateTransportation(model : TransportationModel){
       return Axios.post("/api/transportations/update", model)
    }
}
