import { D, da } from "@fullcalendar/core/internal-common";

export class Config {
    id: number;
    price: number;
    dateTo: string | null;
    dateFrom: string | null;
    beforStartTimeInHour: number | null;
    summary: number | null;
    fixedCosts: number;
    whenCloseTraining: number | null;
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
    name: string;
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
        this.name = this.firstName + ' ' + this.lastName;
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
export class Training {
    dateFrom: Date | null;
    dateTo: Date | null;
    title: string | null;
    type: number | null;
    price: number | null;
    textAddition: string | null;
    numberPeople: number | null;
    locationId: number | null;
    time: string | null;

    constructor(init?: Partial<Training>) {
        Object.assign(this, init);
        if (init?.dateFrom)
            this.dateFrom = new Date(init?.dateFrom);
        if (init?.dateTo)
            this.dateTo = new Date(init?.dateTo);
        this.time = this.dateFrom?.toString().split('T')[1].split('.')[0];

    }
}
export class TrainingWeek {
    currentWeekItems: HourlyActivities[] = [];
    nextWeekItems: HourlyActivities[] = [];
    constructor(init?: Partial<TrainingWeek>) {
        Object.assign(this, init);
    }
}

export class HourlyActivities {
    time: string;
    activities: Training[] = [];
    constructor(init?: Partial<HourlyActivities>) {
        Object.assign(this, init);
    }
}

export class Location {
    id: number;
    name: string;
    adres: string;
    Map: string;
    MapIframe: string | null;
    constructor(init?: Partial<Location>) {
        Object.assign(this, init);

    }
}

export class Reservation {
    id: number;
    price: number | null;
    isDelete: boolean | null;
    remove: string | null;
    create: string | null;
    beforStartTimeInHour: number | null;
    whenCloseRezerwation: number | null;
    locationId: number | null;
    type: number | null;
    paid: boolean | null;
    trainingId: number | null;
    userId: number | null;
    user: User | null;
    constructor(init?: Partial<Reservation>) {
        Object.assign(this, init);
       if(init?.user)
        this.user = new User(init?.user);
    }
}

export const LocationOptions: Location[] =
    [
        new Location({ name: 'Zręcin', id: 1, adres: 'Przedszkole ul. Łukasiewicza 31, 38-457 Zręcin', Map: 'https://maps.app.goo.gl/cpxeACiE9XCxBfuY6', MapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.6626465347107!2d21.690804382387114!3d49.6650699068064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c496d04227bd9%3A0xb8559a1251a16c82!2sPrzedszkole%20Samorz%C4%85dowe%20w%20Zr%C4%99cinie!5e1!3m2!1spl!2spl!4v1723996324000!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' }),
        new Location({ name: 'Równe', id: 2, adres: 'Szkoła Podstawowa ul. Długa 41, 38-451 Równe', Map: 'https://maps.app.goo.gl/tpXbTvSCE8b6BD5s8', MapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1537.778187475247!2d21.720525625472334!3d49.59351892092459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c3818aa82c1df%3A0xfa1ff2578fa9216c!2sSzko%C5%82a%20Podstawowa%20im.%20Marii%20i%20Micha%C5%82a%20Krukierk%C3%B3w%20w%20R%C3%B3wnem!5e0!3m2!1spl!2spl!4v1723996742973!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' }),
    ];
export class TypeTrening {
    id: number;
    name: string;
    value: number;
    constructor(init?: Partial<TypeTrening>) {
        Object.assign(this, init);

    }
}
export const TypeOptions: TypeTrening[] =
    [
        new TypeTrening({ name: 'Full Body Workout', value: 1 }),
        new TypeTrening({ name: 'Body& Mind', value: 2 }),
        new TypeTrening({ name: 'Fitness', value: 3 }),
    ];

