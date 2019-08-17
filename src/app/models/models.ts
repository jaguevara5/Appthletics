export interface Sport {
    id?: string;
    name: string;
}

export interface District {
    id?: string;
    name: string;
}

export interface Stadium {
    id?: string;
    name: string;
    address: string;
}

export enum ToastrType {
    error,
    success
}
