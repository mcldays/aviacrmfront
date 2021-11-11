// @ts-ignore
import Axios from '/axios_settings';

export class PersonsController{
    public static async GetAllPersons() {
        return Axios.get("/api/Persons/GetAll")
    }

    public static async AddPerson(model : any) {
        return Axios.post("/api/Persons/Add", model)
    }

    public static async EditPerson(model : any) {
        return Axios.post("/api/Persons/Update", model)
    }

    public static async RemovePerson(id : number) {
        return Axios.get("/api/Persons/Remove?id=" + id)
    }
}
