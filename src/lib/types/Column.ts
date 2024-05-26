import {MainTask} from "@/lib/types/MainTask";

export interface Column {
    "id": string;
    "name": string;
    "mainTasks": MainTask[]
}