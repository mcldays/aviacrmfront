// @ts-ignore
import Axios from '/axios_settings';
import {AgentModel} from "@/models/transporations/AgentModel";

export class AgentsController{
    public static async GetAllAgents() {
       return Axios.get("/api/Agents/GetAll")
    }

    public static async AddAgent(model : AgentModel) {
       return Axios.post("/api/Agents/Add", model)
    }

    public static async EditAgent(model : AgentModel) {
       return Axios.post("/api/Agents/Update", model)
    }

    public static async RemoveAgent(id : number) {
       return Axios.get("/api/Agents/Remove?id=" + id)
    }
}
