function TimeSlot() {
    return <div className="h-7 hover:bg-stone-100"></div>
}

export default function DayGrid() {
    const timeSlots = [];
    for (let i = 0; i < 48; i++) {
        timeSlots.push(<TimeSlot key={i} />);
    }
    return (
        <div className="grid grid-rows-48 divide-y w-full border-r border-b">{timeSlots}</div>
    )
}