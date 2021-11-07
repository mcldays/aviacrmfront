// @ts-ignore
import Axios from '/axios_settings';
import NewTransportation from "@/components/UIComponents/Transportaions/NewTransportation.vue";

export class TransporationController{
    public AddNewTransporation(model : NewTransportation) {
       return Axios.post("/api/transportations/add", model)
}
}
