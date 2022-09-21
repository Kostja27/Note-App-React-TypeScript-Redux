export type rowDate={
    Name: string,
     Created: string, 
     Category: string, 
     Content: string, 
     Dates: string, 
     Status:boolean|string
}
export type date={
    row: rowDate[]
    input:rowDate
}
export type action = { 
    type: string, 
    num: number, 
    newRow: rowDate }

export type rowStatistics={
    name:string;
    Active:number;
    Archived:number
}    