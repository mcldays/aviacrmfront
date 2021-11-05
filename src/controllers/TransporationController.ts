import Axios, { AxiosPromise, AxiosResponse } from 'axios';
import NewTransportation from "@/components/UIComponents/Transportaions/NewTransportation.vue";

export class TransporationController{
    public AddNewTransporation(model : NewTransportation) {
       return Axios.post("89.108.103.251/api/transportations/add", model)
}
}
