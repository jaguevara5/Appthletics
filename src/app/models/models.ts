export interface Sport {
    id?: string;
    name: string;
}

export enum ToastrType {
    error,
    success
}

export interface User {
    username: string;
    password: string;
    userId?: number;
}
