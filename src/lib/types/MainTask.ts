import {SubTask} from "@/lib/types/SubTask";

export interface MainTask {
    "description": string;
    "id": number;
    "status": string;
    "title": string;
    subTasks: SubTask[];
}