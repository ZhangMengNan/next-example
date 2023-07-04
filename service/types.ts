export interface IResult<T = any> {
    code: number;
    msg: string;
    data?: T;
}

export enum RequestEnums {
    TIMEOUT = 20000,
    SUCCESS = 200,
}
