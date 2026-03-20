
interface InputProps {
    label?: string;
}

export default function PrimaryInput({ label }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (<label className="text-base font-medium uppercase text-neutral-500">{label}</label>)}
            <input
                type="text"
                placeholder="text"
                className="py-2 px-6 rounded-full ring ring-outline-variant bg-surface-container"
            />
        </div>
    );
}