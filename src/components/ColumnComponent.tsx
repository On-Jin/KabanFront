import {Column} from "@/lib/types/Column";
import MainTaskComponent from "@/components/MainTaskComponent";

export default function ColumnComponent({column}: { column: Column }) {
  
    return (
        <>
            <div>
                {column.name}
                <div>
                    <div>{column.name}</div>
                    <div>
                        {column.mainTasks.map(m => <MainTaskComponent key={m.id} mainTask={m}/>)}
                    </div>
                </div>
            </div>
        </>
    );
}