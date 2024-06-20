import {InputSubTask} from "@/lib/forms/InputSubTask";

export type InputMainTask = {
    title: string,
    description: string,
    status: string,
    subtasks: InputSubTask[];
};
