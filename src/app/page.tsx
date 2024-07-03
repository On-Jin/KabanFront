'use client'
import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonSize, KButtonType} from "@/components/K/KButton";
import KProcessing from "@/components/K/KProcessing";
import {useRouter} from "next/navigation";
import useSetUrl from "@/hooks/useSetUrl";
import ModalHandler from "@/components/Modals/ModalHandler";

export default function Home() {
    const boardIds = useBoardStore((state) => state.boardIds);
    const populateMe = useBoardStore((state) => state.populateMe);
    const [isProcessNewBoard, setIsProcessNewBoard] = useState(false);
    const addBoard = useBoardStore((state) => state.addBoard);
    const {replace} = useRouter();
    const {setAddBoardUrl} = useSetUrl();

    const addNewBoardHandler = async () => {
        setAddBoardUrl();
        // setIsProcessNewBoard(true)
        // populateMe()
        //     .then((newBoardIds) => {
        //         setIsProcessNewBoard(false);
        //         replace(`/board/${newBoardIds[0]}`);
        //     });
    };

    return (
        <div className="grow">
            {/*{boardIds!.map(info => (<Link key={info.id} href={`/board/${info.id}`}>{info.name}</Link>))}*/}
            {/*<button onClick={populateMe}>Populate</button>*/}

            <div className="flex-col content-center h-full mb-4 md:mb-6 space-y-6">
                <p className="text-center px-6 text-k-medium-grey heading-l">
                    There is no boards. Create a new board to get started.
                </p>

                <KButton
                    className="w-fit mx-auto"
                    disabled={isProcessNewBoard}
                    onClick={addNewBoardHandler}
                    buttonSize={KButtonSize.Large}
                    buttonType={KButtonType.Primary}
                >
                    {isProcessNewBoard ? <KProcessing/> : '+ Add New Board'}
                </KButton>

                <ModalHandler/>
            </div>


            <KButton
                disabled={isProcessNewBoard}
                onClick={addNewBoardHandler}
                buttonSize={KButtonSize.Small}
                buttonType={KButtonType.Destructive}
            >
                {isProcessNewBoard ? <KProcessing/> : '+ Add New Board'}
            </KButton>
        </div>
    );
}
