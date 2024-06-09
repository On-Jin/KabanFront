'use client'
import {useRouter} from 'next/navigation'
import {usePathname, useSearchParams,} from 'next/navigation';
import {useEffect, useState} from 'react'
import Modal from "@/components/Modal";
import MainTaskModal from "@/components/MainTaskModal";

const ModalHandler = () => {
    const router = useRouter()
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());

        const taskParam = params.get("task");
        if (!taskParam) {
            setId(null);
            return;
        }

        const taskId = parseInt(taskParam);

        if (taskId) {
            setId(taskId);
        } else {
            setId(null);
        }
    }, [pathname, searchParams])

    // const handleOpenModal = (taskId: number) => {
    //     // Update URL with the task Id
    //     router.push(`/tasks?id=${taskId}`)
    // }

    // The function to close the modal and remove the task Id from the URL
    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams?.toString());
        // setIsModalOpen(false)
        setId(null);
        params.delete('task');
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            {/*<button onClick={() => handleOpenModal(1)}>Open Modal for Task 1</button>*/}
            <button onClick={() => handleCloseModal()}>REm</button>

            {id && (<div>{id}</div>)}
            {/*{ isModalOpen && <MainTaskModal onClose={handleCloseModal} /> }*/}
            <Modal isOpen={id != null} onClose={handleCloseModal}>
                <MainTaskModal id={id!}/>
                {/*<MainTaskEditModal mainTask={mainTask} setMainTask={setMainTask}/>*/}
            </Modal>
        </>
    )
}

export default ModalHandler