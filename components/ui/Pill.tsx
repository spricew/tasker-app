interface PillProps {
    text: string;
}

export default function Pill({text} : PillProps) {
    return (
        <span
            className={`inline-flex flex-nowrap items-center h-fit w-fit px-1.5 py-0.5 
             rounded-full ring ring-inset text-xs font-medium text-nowrap
             bg-primary-background text-primary`}
        >
            {/* <span className={`mr-1 inline-block size-1.5 rounded-full`}/> */}
            {text}
        </span>
    );
}