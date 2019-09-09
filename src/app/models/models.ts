export interface Sport {
    _id?: string;
    name: string;
}

export interface District {
    _id?: string;
    name: string;
}

export interface Stadium {
    _id?: string;
    name: string;
    address?: string;
}

export enum ToastrType {
    error,
    success
}

export interface School {
    _id?: string;
    name: string;
    address?: string;
}

export interface Team {
    _id?: string;
    name: string;
    district: District;
    sport: Sport;
    school: School;
    category: Category;
}

export interface TeamSaveUpdate {
    _id?: string;
    name: string;
    district: string;
    sport: string;
    school: string;
    category: string;
}

export interface Category {
    name: string;
    _id: string;
}

export interface TeamsQueryParams {
    district: string;
    sport: string;
    category: string;
}