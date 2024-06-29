import React from "react";

export default function ColumnCircleColor({columnId}: {
    columnId: number,
}) {
    const colors = [
        "#49C4E5",
        "#8471F2",
        "#5dedaf",
        "#f142e0",
        "#f14242",
        "#faf23a",
        "#87dc2f",
    ]

    return (
        <div className={`w-[15px] h-[15px] rounded-full`}
             style={{background: colors[columnId % colors.length]}}
        />
    );
}
