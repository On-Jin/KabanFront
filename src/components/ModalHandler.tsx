'use client'
import {useRouter} from 'next/navigation'
import {usePathname, useSearchParams,} from 'next/navigation';
import {useEffect, useRef, useState} from 'react'
import Modal from "@/components/Modal";
import MainTaskModal from "@/components/MainTaskModal";
import MainTaskEditModal from "@/components/MainTaskEditModal";
import {CSSTransition} from "react-transition-group";
import ReactDOM from "react-dom";
import MainTaskCreateModal from "@/components/MainTaskCreateModal";
import {MainTask} from "@/lib/types/MainTask";
import {useBoardStore} from "@/hooks/useStore";
import BoardCreateModal from "@/components/BoardCreateModal";

export enum ModalState {
    None,
    ViewMainTask,
    EditMainTask,
    CreateMainTask,
    DeleteMainTask,
    CreateBoard
}

interface ModalData {
    ModalState: ModalState;
    Id: number | null;
    MainTask: MainTask | null;
}


const NoneData: ModalData = {ModalState: ModalState.None, Id: null, MainTask: null};

const ModalHandler = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [modalState, setModalState] = useState<ModalData>(NoneData);
    const [previousModalState, setPreviousModalState] = useState<ModalData>(NoneData);
    const selectMainTaskById = useBoardStore((state) => state.selectMainTaskById);


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
                setModalState({ModalState: ModalState.ViewMainTask, Id: id, MainTask: selectMainTaskById(id)});
                return;
            case ModalState.EditMainTask:
                if (id == null) break;
                setModalState({ModalState: ModalState.EditMainTask, Id: id, MainTask: selectMainTaskById(id)});
                return;
            case ModalState.CreateMainTask:
                setModalState({ModalState: ModalState.CreateMainTask, Id: id, MainTask: null});
                return;
            case ModalState.DeleteMainTask:
                if (id == null) break;
                setModalState(NoneData);
                return;
            case ModalState.CreateBoard:
                setModalState({ModalState: ModalState.CreateBoard, Id: null, MainTask: null});
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

    const renderModalContent = (state: ModalData) => {
        switch (state.ModalState) {
            case ModalState.ViewMainTask:
                return <MainTaskModal mainTask={state.MainTask!} onClose={handleCloseModal}/>;
            case ModalState.EditMainTask:
                return <MainTaskEditModal mainTask={state.MainTask!} onClose={handleCloseModal}/>;
            case ModalState.CreateMainTask:
                return <MainTaskCreateModal onClose={handleCloseModal}/>;
            case ModalState.CreateBoard:
                return <BoardCreateModal onClose={handleCloseModal}/>;
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
