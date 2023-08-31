
export type Apartment = {
    id: number; //change it string when connecting to db
    bathroom: number;
    bedroom: number;
    images: string[];
    property_id: string;
    rent: number;
    sqFt: number;
    unit: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}