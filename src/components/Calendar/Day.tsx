export default function Day({day, children}: {day: string, children: React.ReactNode}) {
    return (
        <div className="flex flex-col items-center">
            <div className="pb-2 sticky top-0 w-full bg-stone-50 border-b">
                <h3 className="text-lg font-semibold text-center">{day}</h3>
            </div>
            {children}
        </div>
    )

}