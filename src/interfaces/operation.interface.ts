export interface IOperationWorth {
    [key:string]: number
    multiplication: number
    division: number,
    substract: number,
    add: number
}

export interface IOperation {
    [key:string]: number | string
    type: string
    value: number
}