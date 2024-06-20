'use client'
import Image from "next/image";
import logo from '/public/logo-dark.svg';
import iconCheck from '/public/icon-check.svg';
import {useEffect, useState} from "react";
import KCheckbox from "@/components/KCheckbox";
import KButton, {KButtonSize, KButtonType} from "@/components/KButton";
import KStringput from "@/components/KStringput";
import KDropDown from "@/components/KDropDown";

const data = {
    colors: [
        {
            hex: "#635FC7",
            rgb: "99, 95, 199",
            hsl: "242°, 48%, 58%",
            className: "bg-k-purple",
        }, {
            hex: "#A8A4FF",
            rgb: "168, 164, 255",
            hsl: "243°, 100%, 82%",
            className: "bg-kh-purple",
        }, {
            hex: "#000112",
            rgb: "0, 1, 18",
            hsl: "237°, 100%, 4%",
            className: "bg-k-black",
        }, {
            hex: "#20212C",
            rgb: "32, 33, 44",
            hsl: "235°, 16%, 15%",
            className: "bg-[#20212C]",
        }, {
            hex: "#2B2C37",
            rgb: "43, 44, 55",
            hsl: "235°, 12%, 19%",
            className: "bg-k-dark-grey",
        }, {
            hex: "#3E3F4E",
            rgb: "62, 63, 78",
            hsl: "236°, 11%, 27%",
            className: "bg-kd-lines",
        }, {
            hex: "#828FA3",
            rgb: "130, 143, 163",
            hsl: "216°, 15%, 57%",
            className: "bg-k-medium-grey",
        }, {
            hex: "#E4EBFA",
            rgb: "228, 235, 250",
            hsl: "221°, 69%, 94%",
            className: "bg-kl-lines",
        }, {
            hex: "#F4F7FD",
            rgb: "244, 247, 253",
            hsl: "220°, 69%, 97%",
            className: "bg-k-light-grey",
        }, {
            hex: "#FFFFFF",
            rgb: "255, 255, 255",
            hsl: "0°, 0%, 100%",
            className: "bg-white border-[1px] rounded border-kl-lines",
        }, {
            hex: "#EA5555",
            rgb: "234, 85, 85",
            hsl: "0°, 78%, 63%",
            className: "bg-k-red",
        }, {
            hex: "#FF9898",
            rgb: "255, 152, 152",
            hsl: "#0°, 100%, 80%",
            className: "bg-kh-red",
        }
    ],
    typo: {
        heading: [
            {
                px: "24",
                line: "30",
                weight: "Bold",
                text: "Heading (XL)",
                className: "heading-xl"
            },
            {
                px: "18",
                line: "23",
                weight: "Bold",
                text: "Heading (L)",
                className: "heading-l"
            },
            {
                px: "15",
                line: "19",
                weight: "Bold",
                text: "Heading (M)",
                className: "heading-m"
            },
            {
                px: "12",
                line: "15",
                kerning: "2.4",
                weight: "Bold",
                text: "Heading (S)",
                className: "heading-s text-k-medium-grey"
            },
        ],
        body: [
            {
                px: "13",
                line: "23",
                weight: "Medium",
                text: "Body (L) - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
                className: "body-l"
            },
            {
                px: "12",
                line: "15",
                weight: "Bold",
                text: "Body (M) - - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
                className: "body-m"
            },
        ]
    }
};

function generateTypo(d: any, index: number) {
    return (
        <div key={index} className="space-y-2">
            <div className="body-l space-x-4">
                <span className="text-k-medium-grey">Plus Jakarta Sans</span>
                <span className="font-bold">{d.weight}</span>
                <span>{d.px}px</span>
                <span>{d.line}px Line</span>
                {d.kerning &&
                    <span>{d.kerning}px Kerning</span>
                }
            </div>
            <p className={d.className}>{d.text}</p>
        </div>);
}

function generateTitle(title: string, index: number) {
    return (
        <div className="heading-xl space-x-4">
            <span className="text-k-purple">0{index}</span>
            <span>{title}</span>
        </div>);
}

enum LocalTaskState {
    Todo = "Todo",
    Doing = "Doing",
    Done = "Done",
}

const renderButtons = (disabled: boolean) => (
    <div className="interactive-button flex flex-row items-center space-x-4">
        <div className="w-full">
            <KButton disabled={disabled}>
                Button Primary (L)
            </KButton>
        </div>

        <div className="w-full">
            <KButton
                disabled={disabled}
                buttonSize={KButtonSize.Small}
            >
                Button Primary (S)
            </KButton>
        </div>

        <div className="w-full">
            <KButton
                disabled={disabled}
                buttonType={KButtonType.Secondary}
                buttonSize={KButtonSize.Small}
            >
                Button Secondary
            </KButton>
        </div>

        <div className="w-full">
            <KButton
                disabled={disabled}
                buttonType={KButtonType.Destructive}
                buttonSize={KButtonSize.Small}
            >
                Button Destructive
            </KButton>
        </div>
    </div>
);

export default function DesignSystem() {

    const [checkbox, setCheckbox] = useState(true);
    const [inputText, setInputText] = useState("!tupni");
    const [valueDropDown, setValueDropDown] = useState("Todo");
    const optionsDropDown = ["Todo", "Doing", "Done"];

    const [taskState, setTaskState] = useState(LocalTaskState.Doing);

    const interactivePanel = (
        <div className="space-y-8">

            {renderButtons(false)}
            {renderButtons(true)}

            <div className="flex space-x-8">
                <div className="interactive-checkbox space-y-4 w-full">
                    <div className="text-k-medium-grey body-m dark:text-white">Subtask Checkbox</div>
                    <div className="w-full">
                        <KCheckbox value={checkbox} updateCheckbox={(v) => setCheckbox(v)}>input</KCheckbox>
                    </div>
                    <div className="w-full">
                        <KCheckbox value={!checkbox} updateCheckbox={(v) => setCheckbox(v)}>input</KCheckbox>
                    </div>
                </div>
                <div className="interactive-stringput space-y-4 w-full">
                    <div className="text-k-medium-grey body-m dark:text-white">Text Field</div>

                    <KStringput
                        onChange={event  => setInputText(event.target.value)}
                        value={inputText}
                    />

                    <KStringput/>
                </div>

                <div className="interactive-dropdown space-y-4 w-full">
                    <div className="text-k-medium-grey body-m dark:text-white">Dropdown</div>

                    <KDropDown
                        value={valueDropDown}
                        options={optionsDropDown}
                        onChange={(v) => {
                            setValueDropDown(v);
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-kl-lines">
            <div className="min-h-screen max-w-[80ch] mx-auto *:p-8 *:rounded-xl space-y-8">
                <div className="flex justify-between">
                    <Image
                        priority
                        className="h-full"
                        src={logo}
                        alt="Kaban logo"
                    />
                    <h1 className="heading-xl">Design System</h1>
                </div>
                <div className="bg-white space-y-6">
                    {generateTitle("Colors", 1)}

                    <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                        {(() => {
                            const arr: any[] = [];
                            data.colors.forEach((c, i) => {
                                arr.push(
                                    <div key={i} className="w-full space-y-2">
                                        <div className={"relative h-16 rounded-lg " + c.className}>
                                            <div className="absolute left-2 bottom-2 heading-m text-white"><span
                                                className="opacity-50">#</span>{c.hex.substring(1)}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[1fr_3fr]
                                                    text-black body-l gap-x-4">
                                            <div className="text-k-medium-grey">RGB</div>
                                            <div>{c.rgb}</div>
                                            <div className="text-k-medium-grey">HSL</div>
                                            <div>{c.hsl}</div>
                                        </div>
                                    </div>
                                );
                            });
                            return arr;
                        })()}
                    </div>
                </div>
                <div className="bg-white space-y-6">
                    {generateTitle("Typography", 2)}

                    <div className="flex space-x-8">
                        <div className="flex flex-col justify-between text-nowrap">
                            {data.typo.heading.map((d, i) => generateTypo(d, i))}
                        </div>
                        <div className="flex flex-col space-y-4 justify-between">
                            {data.typo.body.map((d, i) => generateTypo(d, i))}
                        </div>
                    </div>
                </div>

                <div className="bg-white space-y-6">
                    {generateTitle("Interactive Elements", 3)}

                    <h4 className="heading-l text-k-medium-grey">Light Version</h4>
                    {interactivePanel}
                </div>

                <div className="dark bg-k-dark-grey text-white space-y-6">
                    <h4 className="heading-l text-k-medium-grey">Dark Version</h4>
                    {interactivePanel}
                </div>

                <div className="h-96">
                </div>
            </div>
        </div>
    );
}
