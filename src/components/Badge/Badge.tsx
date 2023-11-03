
interface BadgeProps {
    children: React.ReactNode, 
    className?: string
}

function Badge({children, className}: BadgeProps) {
    return (
        <div className={"inline-flex items-center justify-center w-fit py-0.5 px-1.5 rounded-lg " + className}>
            {children}
        </div>
    )
}

export default Badge;