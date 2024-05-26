import {Column} from "@/lib/types/Column";

export interface Board {
    "id": string;
    "name": string;
    "columns": Column[]
}
