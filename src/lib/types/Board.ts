import {Column} from "@/lib/types/Column";

export interface Board {
    "id": number;
    "name": string;
    "columns": Column[]
}
