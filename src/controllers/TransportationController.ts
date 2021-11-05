import Axios, { AxiosPromise, AxiosResponse } from 'axios';
import NewTransportationModel from "@/models/transporations/NewTransportationModel";
import {TransportationReadModel} from "@/models/transporations/readmodels/TransportationReadModel";
Axios.defaults.baseURL = 'http://89.108.103.251';
export class TransportationController {
    public async AddNewTransportation(model : NewTransportationModel) {
       return await Axios.post("/api/transportations/add", model)
}
    public async GetAllTransportations() : Promise<NewTransportationModel>{
        return await Axios.get("api/transportations/getall")
    }
}
