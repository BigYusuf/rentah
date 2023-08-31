import { Apartment } from "./apartment";
import { Review } from "./review";

export type Property = {
    id: number;
    images: any[];
    rentLow: number;
    rentHigh: number;
    bedroomLow: number;
    bedroomHigh: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    tags: string[];
    lat: number;
    long: number;
    about: string;
    phoneNumber: string;
    website: string;
    dogsAllowed: boolean;
    dogLimit: number;
    dogDetails: string;
    dogNeutered: boolean;
    dogDeclawed: boolean;
    dogInterview?: boolean;
    catsAllowed: boolean;
    catLimit: number;
    catDetails: string;
    catNeutered: boolean;
    catDeclawed: boolean;
    catInterview?: boolean;
    stars: number;
    reviews: Review[];
    features: string[];
    apartments: Apartment[];
}