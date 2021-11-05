export class PlaceModel{
    Seats : number;
    Weight : number;
    Length : number;
    Width : number;
    Height : number;
    Volume? : number;
    TotalWeight? : number;
    VolumeWeight? : number;
    Id? : number;

    constructor(Seats: number, Weight: number, Length : number, Width: number, Height: number ) {

        this.Seats = Seats;
        this.Weight = Weight;
        this.Length = Length;
        this.Width = Width;
        this.Height = Height
    }
}
