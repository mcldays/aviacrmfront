// @ts-ignore
import Axios, { AxiosPromise, AxiosResponse } from '/axios_settings';
import {TransportationModel} from "@/models/transportations/TransportationModel";
// Axios.defaults.baseURL = 'http://89.108.103.251';
export class TransportationController {
    public AddNewTransportation(model : TransportationModel) {
       return  Axios.post("/api/transportations/add", model)
}
    public GetAll() : AxiosPromise<TransportationModel[]> {
        let response = Axios.get("api/transportations/getmy")
        return response
    }

    public RemoveTransportationFromId(id : number){
        return Axios.get(`api/transportations/remove?id=${id}`)
    }
    public async UpdateTransportation(model : TransportationModel){
       return Axios.post("/api/transportations/update", model)
    }
}
