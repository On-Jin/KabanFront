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
            return " text-white bg-k-purple hover:bg-kh-purple";
        case KButtonType.Secondary:
            return (
                " text-k-purple bg-k-purple bg-opacity-10 hover:bg-opacity-25" +
                " dark:bg-white dark:hover:bg-opacity-95"
            );
        case KButtonType.Destructive:
            return " text-white bg-k-red hover:bg-kh-red";
    }
    return " ";
}

export default function KButton({children, buttonType = KButtonType.Primary, buttonSize = KButtonSize.Large, onClick}: {
    children: string,
    buttonType?: KButtonType,
    buttonSize?: KButtonSize,
    onClick?: () => void
}) {

    return (
        <div
            className={
                " flex justify-center items-center" +
                " px-8 rounded-full font-bold" +
                GetClassKButtonType(buttonType) +
                GetClassKButtonSize(buttonSize)
            }
            onClick={() => onClick?.()}
        >
            {children}
        </div>
    );
}