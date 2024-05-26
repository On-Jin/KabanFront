import {Board} from "@/lib/types/Board";
import MainTaskComponent from "@/components/MainTaskComponent";
import ColumnComponent from "@/components/ColumnComponent";

export default function BoardComponent({board} : {board: Board}) {
    return (
        <div>
            <div>{board.name}</div>
            <div>
                {board.columns.map(c => <ColumnComponent key={c.id} column={c}/>)}
            </div>
        </div>
    );
}