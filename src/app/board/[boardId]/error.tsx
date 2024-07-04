'use client'

import {useEffect} from 'react'
import {useRouter} from "next/navigation";

export default function Error({
                                  error,
                              }: {
    error: Error & { digest?: string }
}) {
    const {replace} = useRouter();

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    () => {
                        replace('/');
                    }
                }
            >
                Return to home page
            </button>
        </div>
    )
}
