export class TransportationReadModel{
    constructor(id : number, number : number, dateAN : string, dateOfLeave : string, flightCode : string, totalWeight : string,
    Seats : string) {
        this.id = id
        this.number = number
        this.dateAN = dateAN
        this.dateOfLeave = dateOfLeave
        this.flightCode = flightCode
        this.totalWeight = totalWeight
        this.Seats = Seats
    }
    id : number
    number : number
    dateAN :  string
    dateOfLeave : string
    flightCode : string
    totalWeight : string
    totalCost? : string
    Seats : string
    Volume : string
    Destination : string
    Agent :  string
}
