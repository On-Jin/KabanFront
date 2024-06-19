'use client'
import {useRouter} from 'next/navigation'
import {usePathname, useSearchParams,} from 'next/navigation';
import {useEffect, useRef, useState} from 'react'
import Modal from "@/components/Modal";
import MainTaskModal from "@/components/MainTaskModal";
import MainTaskEditModal from "@/components/MainTaskEditModal";
import {CSSTransition} from "react-transition-group";
import ReactDOM from "react-dom";

export enum ModalState {
    None,
    ViewMainTask,
    EditMainTask,
    CreateMainTask,
    DeleteMainTask
}

interface ModalParams {
    ModalState: ModalState;
    Id: number | null
}

const NoneState: ModalParams = {ModalState: ModalState.None, Id: null};

const ModalHandler = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [modalState, setModalState] = useState<ModalParams>(NoneState);
    const [previousModalState, setPreviousModalState] = useState<ModalParams>(NoneState);

    const ref = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());
        const actionParam = params.get("action");
        const taskParam = params.get("task");
        if (actionParam == null || taskParam == null) {
            setModalState(NoneState);
            return;
        }

        const taskId = parseInt(taskParam);


        if (actionParam === ModalState.EditMainTask.toString()) {
            setModalState({ModalState: ModalState.EditMainTask, Id: taskId});
            return;
        }

        if (actionParam === ModalState.ViewMainTask.toString()) {
            setModalState({ModalState: ModalState.ViewMainTask, Id: taskId});
            return;
        }
        setModalState(NoneState);
    }, [pathname, searchParams])

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams?.toString());
        setPreviousModalState(modalState);
        setModalState(NoneState);
        params.delete('task');
        params.delete('action');
        replace(`${pathname}?${params.toString()}`);
    }

    const renderModalContent = (state: ModalParams) => {
        switch (state.ModalState) {
            case ModalState.ViewMainTask:
                return <MainTaskModal id={state.Id!}/>;
            case ModalState.EditMainTask:
                return <MainTaskEditModal id={state.Id!}/>;
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
                onExited={() => setPreviousModalState(NoneState)}
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
