import React, {forwardRef, ReactNode} from "react";
import clsx from "clsx";

export enum KButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Destructive = 'destructive',
}

export enum KButtonSize {
    Large,
    Small
}

function GetClassKButtonSize(buttonSize: KButtonSize): string {
    switch (buttonSize) {
        case KButtonSize.Large:
            return " h-12 heading-m";
        case KButtonSize.Small:
            return " h-10 body-l";
    }
}

function GetClassKButtonType(buttonType: KButtonType): string {
    switch (buttonType) {
        case KButtonType.Primary:
            return " text-white bg-k-purple enabled:hover:bg-kh-purple";
        case KButtonType.Secondary:
            return (
                " text-k-purple bg-k-purple bg-opacity-10 enabled:hover:bg-opacity-25" +
                " dark:bg-white dark:enabled:hover:bg-opacity-95"
            );
        case KButtonType.Destructive:
            return " text-white bg-k-red hover:enabled:bg-kh-red";
    }
    return " ";
}

interface KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    buttonType?: KButtonType,
    buttonSize?: KButtonSize,
}

const KButton =
    forwardRef<HTMLButtonElement, KButtonProps>(
        function KButton(
            {
                children,
                buttonType = KButtonType.Primary,
                buttonSize = KButtonSize.Large,
                ...rest
            },
            ref
        ) {
            return (
                <button
                    type="button"
                    ref={ref}
                    {...rest}
                    className={clsx(
                        `w-full flex justify-center items-center \
                        px-8 rounded-full font-bold \
                        disabled:opacity-50 \
                        ${GetClassKButtonType(buttonType)} \
                        ${GetClassKButtonSize(buttonSize)} `,
                        {}
                    )}
                >
                    {children}
                </button>
            );
        });

export default KButton
