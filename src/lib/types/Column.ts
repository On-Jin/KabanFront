import {MainTask} from "@/lib/types/MainTask";

export interface Column {
    "id": number;
    "name": string;
    "mainTasks": MainTask[]
}
