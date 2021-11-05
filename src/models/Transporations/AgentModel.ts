export default class AgentModel{
    constructor(Name : string, OfficialName : string, Phone : string, Director : string,
                Accountant : string, LegalAddress  :string, FactAddress: string, PostAddress : string,
                INN: string, KPP: string, BIC : string, KS : string, RS: string,
                BankName : string, ContractNumber : string, ContractDate : string,
                FileName : string,) {
        this.Name = Name
        this.OfficialName = OfficialName
        this.Phone = Phone
        this.Director = Director
        this.Accountant = Accountant
        this.LegalAddress = LegalAddress
        this.FactAddress = FactAddress
        this.PostAddress = PostAddress
        this.INN = INN
        this.KPP = KPP
        this.BIC = BIC
        this.KS = KS
        this.RS = RS
        this.BankName = BankName
        this.ContractNumber = ContractNumber
        this.ContractDate = ContractDate
        this.FileName = FileName

    }
    Name : string
    OfficialName : string
    Phone : string
    Director : string
    Accountant : string
    LegalAddress  :string
    FactAddress: string
    PostAddress : string
    INN: string
    KPP: string
    BIC : string
    KS : string
    RS: string
    BankName : string
    ContractNumber : string
    ContractDate : string
    FileName : string
}

class Station
{
    Name : string
    Country : string
    Status: string
    FlightCode : string
    IsDestination : string
    IsDeparture : string
    Description : string
    IsActive : string
}

export class Persons{

}
