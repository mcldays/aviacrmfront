import CarrierModel from "./CarrierModel"
export default class NewTransporationModel{
    constructor(Carrier : CarrierModel, Number : number, DateAN : string, DateOfLeave : string,  ) {
        this.Carrier = Carrier
        this.Number = Number
        this.DateAN = DateAN
        this.DateOfLeave = DateOfLeave
    }
    Carrier : CarrierModel
    Number : number
    DateAN : string
    DateOfLeave : string

}
