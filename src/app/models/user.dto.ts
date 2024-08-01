export class Config {
    id: number;
    price: number;
    dateTo: string | null;
    dateFrom: string | null;
    beforStartTimeInHour: number | null;
    summary: number | null;
    fixedCosts: number;
    whenCloseTraining: number | null ;
    constructor(init?: Partial<Config>) {
        Object.assign(this, init);
        
    }
}

export class User {
    id: number;
    createDate: string | null;
    moduficationDate: string | null;
    phone: number | null;
    firstName: string;
    lastName: string;
    login: string;
    email: string | null;
    password: string;
    isDeleted: boolean | null;
    isAdmin: boolean | null;
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
        
    }
}
export class Logins {
    login: string | null;
    password: string | null;
    firstName: number | null | undefined;
    lastName: string | null;
    constructor(init?: Partial<Logins>) {
        Object.assign(this, init);
       
    }
}