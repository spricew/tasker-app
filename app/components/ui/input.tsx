
interface InputProps {
    label: string;
}

export default function PrimaryInput({ label }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (<label className="text-base font-medium text-neutral-500">{label}</label>)}
            <input
                type="text"
                placeholder="text"
            />
        </div>
    );
}