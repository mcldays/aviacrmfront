// @ts-ignore
import Axios from '/axios_settings';
import {AgentModel} from "@/models/transportations/AgentModel";
import Vue from "vue";


export class StationsController{
    public static async GetAllStations() {
       return Axios.get("/api/Stations/GetAll")
    }

    public static async AddStations(model: object) {
       return Axios.post("/api/Stations/Add", model)
    }

    public static async EditStations(model : object) {
       return Axios.post("/api/Stations/Update", model)
    }
}
