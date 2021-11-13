// @ts-ignore
import Axios from '/axios_settings';
import {AgentModel} from "@/models/transportations/AgentModel";

export class AgentsController{
    public static async GetAll() {
       return Axios.get("/api/Agents/GetAll")
    }

    public static async Add(model : AgentModel) {
       return Axios.post("/api/Agents/Add", model)
    }

    public static async Edit(model : AgentModel) {
       return Axios.post("/api/Agents/Update", model)
    }

    public static async Remove(id : number) {
       return Axios.get("/api/Agents/Remove?id=" + id)
    }
}
