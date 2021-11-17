// @ts-ignore
import Axios from '/axios_settings';



export class HistoryController{
    public static async Get(model :any) {
        return Axios.post("/api/History/Get", model)
    }
}
