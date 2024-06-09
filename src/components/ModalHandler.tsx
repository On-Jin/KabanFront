'use client'
import {useRouter} from 'next/navigation'
import {usePathname, useSearchParams,} from 'next/navigation';
import {useEffect, useState} from 'react'
import Modal from "@/components/Modal";
import MainTaskModal from "@/components/MainTaskModal";
import MainTaskEditModal from "@/components/MainTaskEditModal";

const EditTask = () => {
    return (
        <>
        </>
    );
};

enum ModalState {
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

    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());

        if (pathname === "/edit-task") {
            setModalState({ModalState: ModalState.EditMainTask, Id: parseInt(params.get("task")!)});
            return;
        }

        const taskParam = params.get("task");

        if (!taskParam) {
            setModalState(NoneState);
            return;
        }

        const taskId = parseInt(taskParam);

        if (taskId) {
            setModalState({ModalState: ModalState.ViewMainTask, Id: taskId});
            return;
        }
        setModalState(NoneState);
    }, [pathname, searchParams])

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams?.toString());
        // setIsModalOpen(false)
        setModalState(NoneState);
        params.delete('task');
        // replace(`/?${params.toString()}`);
    }

    return (
        <>
            <button onClick={() => handleCloseModal()}>Clean</button>

            {modalState && (<div>{JSON.stringify(modalState)}</div>)}
            {/*{ isModalOpen && <MainTaskModal onClose={handleCloseModal} /> }*/}
            <Modal isOpen={modalState.ModalState != ModalState.None} onClose={handleCloseModal}>
                {modalState.ModalState == ModalState.ViewMainTask && <MainTaskModal id={modalState.Id!}/>}
                {modalState.ModalState == ModalState.EditMainTask && <MainTaskEditModal id={modalState.Id!}/>}

                {/*<MainTaskEditModal mainTask={mainTask} setMainTask={setMainTask}/>*/}
            </Modal>
        </>
    )
}

export default ModalHandler