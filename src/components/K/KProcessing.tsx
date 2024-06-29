import {ReactNode} from "react";

export default function KProcessing({children}: { children?: ReactNode }) {

    return (
        <div className="flex gap-x-2 items-center">
            <div
                className="w-4 h-4 rounded-full animate-spin border-4 border-solid border-t-transparent">
            </div>
            <span>{children ? children : 'Processing'}</span>
        </div>
    );
}
