export interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: "food" | "cleaning";
    calories: number | null | undefined;
    expirationDate: Date;
}