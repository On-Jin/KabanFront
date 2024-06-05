export default function KStringput({inputText, onChangeInput}: {
    inputText: string,
    onChangeInput?: (value: string) => void
}) {
    const isEmpty = inputText == undefined || inputText.length === 0;

    return (
        <div className="relative body-l">
            <input
                className={
                    "text-k-black dark:text-white bg-transparent" +
                    " px-4 py-2 rounded border-[1px] border-solid border-k-medium-grey w-full focus:outline-none"
                    + (isEmpty ? " border-opacity-100 border-k-red" : " border-opacity-25")}
                value={inputText}
                onChange={(e) => onChangeInput?.(e.target.value)}
                type="text" name="stringput" placeholder="Enter task name"/>
            {
                (isEmpty) &&
                (<div className="absolute right-0 top-0 bottom-0 self-center pr-4 text-k-red">
                    Can’t be empty
                </div>)
            }

        </div>
    );
}