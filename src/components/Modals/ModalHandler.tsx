'use client'
import {useRouter} from 'next/navigation'
import {usePathname, useSearchParams,} from 'next/navigation';
import {useEffect, useRef, useState} from 'react'
import Modal from "@/components/Modals/Modal";
import {CSSTransition} from "react-transition-group";
import ReactDOM from "react-dom";
import {MainTask} from "@/lib/types/MainTask";
import {useBoardStore} from "@/hooks/useStore";
import {Board} from "@/lib/types/Board";

import BoardCreateModal from "@/components/Modals/Board/BoardCreateModal";
import BoardEditModal from "@/components/Modals/Board/BoardEditModal";
import BoardDeleteModal from "@/components/Modals/Board/BoardDeleteModal";

import MainTaskEditModal from "@/components/Modals/MainTask/MainTaskEditModal";
import MainTaskCreateModal from "@/components/Modals/MainTask/MainTaskCreateModal";
import MainTaskDeleteModal from "@/components/Modals/MainTask/MainTaskDeleteModal";
import MainTaskModal from "@/components/Modals/MainTask/MainTaskModal";


export enum ModalState {
    None,
    ViewMainTask,
    EditMainTask,
    CreateMainTask,
    DeleteMainTask,
    CreateBoard,
    EditBoard,
    DeleteBoard
}

interface ModalData {
    ModalState: ModalState;
    Id: number | null;
    MainTask: MainTask | null;
    Board: Board | null;
}


const NoneData: ModalData = {ModalState: ModalState.None, Id: null, MainTask: null, Board: null};

const ModalHandler = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [modalState, setModalState] = useState<ModalData>(NoneData);
    const [previousModalState, setPreviousModalState] = useState<ModalData>(NoneData);
    const selectMainTaskById = useBoardStore((state) => state.selectMainTaskById);
    const board = useBoardStore((state) => state.board);

    useEffect(() => {
        if (modalState.Id && modalState.MainTask)
            setModalState({...modalState, MainTask: selectMainTaskById(modalState.Id)});
    }, [board]);

    const ref = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());
        const actionParam = params.get("action");
        const idParam = params.get("id");

        if (actionParam == null) {
            setModalState(NoneData);
            return;
        }

        const id = idParam ? parseInt(idParam) : null;

        const actionModalState = parseInt(actionParam) as ModalState;
        switch (actionModalState) {
            case ModalState.None:
                setModalState(NoneData);
                return;
            case ModalState.ViewMainTask:
                if (id == null) break;
                setModalState({
                    ModalState: ModalState.ViewMainTask,
                    Id: id,
                    MainTask: selectMainTaskById(id),
                    Board: null
                });
                return;
            case ModalState.EditMainTask:
                if (id == null) break;
                setModalState({
                    ModalState: ModalState.EditMainTask,
                    Id: id,
                    MainTask: selectMainTaskById(id),
                    Board: null
                });
                return;
            case ModalState.CreateMainTask:
                setModalState({ModalState: ModalState.CreateMainTask, Id: id, MainTask: null, Board: null});
                return;
            case ModalState.DeleteMainTask:
                if (id == null) break;
                setModalState({
                    ModalState: ModalState.DeleteMainTask,
                    Id: id,
                    MainTask: selectMainTaskById(id),
                    Board: null
                });
                return;
            case ModalState.CreateBoard:
                setModalState({ModalState: ModalState.CreateBoard, Id: null, MainTask: null, Board: null});
                return;
            case ModalState.EditBoard:
                setModalState({ModalState: ModalState.EditBoard, Id: null, MainTask: null, Board: null});
                return;
            case ModalState.DeleteBoard:
                if (id == null) break;
                setModalState({ModalState: ModalState.DeleteBoard, Id: id, MainTask: null, Board: board});
                return;
        }
        setModalState(NoneData);
    }, [pathname, searchParams])

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams?.toString());
        setPreviousModalState(modalState);
        setModalState(NoneData);
        params.delete('id');
        params.delete('action');
        replace(`${pathname}?${params.toString()}`);
    }

    const handleDeletedBoard = (newFetchedBoardId: number | null) => {
        const params = new URLSearchParams(searchParams?.toString());
        setPreviousModalState(modalState);
        setModalState(NoneData);
        params.delete('id');
        params.delete('action');
        if (newFetchedBoardId) {
            replace(`/board/${newFetchedBoardId}?${params.toString()}`);
        } else {
            replace(`/?${params.toString()}`);
        }
    }

    const renderModalContent = (state: ModalData) => {
        switch (state.ModalState) {
            case ModalState.ViewMainTask:
                return <MainTaskModal mainTask={state.MainTask!} onClose={handleCloseModal}/>;
            case ModalState.EditMainTask:
                return <MainTaskEditModal mainTask={state.MainTask!} onClose={handleCloseModal}/>;
            case ModalState.CreateMainTask:
                return <MainTaskCreateModal onClose={handleCloseModal}/>;
            case ModalState.DeleteMainTask:
                return <MainTaskDeleteModal mainTask={state.MainTask!} onClose={handleCloseModal}/>;
            case ModalState.CreateBoard:
                return <BoardCreateModal onClose={handleCloseModal}/>;
            case ModalState.EditBoard:
                return <BoardEditModal onClose={handleCloseModal}/>;
            case ModalState.DeleteBoard:
                return <BoardDeleteModal board={state.Board!} onCancel={handleCloseModal}
                                         onDeleted={handleDeletedBoard}/>;
            default:
                return null;
        }
    };

    return ReactDOM.createPortal(
        <div>
            <CSSTransition
                in={modalState.ModalState != ModalState.None}
                timeout={400}
                nodeRef={ref}
                classNames="fade"
                unmountOnExit
                appear
                onExited={() => setPreviousModalState(NoneData)}
            >
                <Modal ref={ref} onClose={handleCloseModal}>
                    {renderModalContent(modalState) || renderModalContent(previousModalState)}
                </Modal>
            </CSSTransition>
        </div>,
        document.body
    )
}

export default ModalHandler
