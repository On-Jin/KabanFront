'use client'

import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/Theme";
import {ReactSVG} from "react-svg";
import clsx from "clsx";
import React from "react";
import {KSwitch} from "@/components/KSwitch";


export default function SwitchTheme({className}: { className?: string }) {
    const [theme, setTheme] = useTheme();

    return (
        <div className={`flex gap-x-6 bg-k-light-grey py-3.5 justify-center rounded-lg ${className}`}>
            <ReactSVG className={clsx("w-4 h-4 fill-[#828FA3]")} src="/icon-light-theme.svg"/>
            <KSwitch checked={theme !== Theme.Light}
                     onChange={(e) => setTheme(!e.target.checked ? Theme.Light : Theme.Dark)}/>
            <ReactSVG className={clsx("w-4 h-4 fill-[#828FA3]")} src="/icon-dark-theme.svg"/>
        </div>
    );
}
