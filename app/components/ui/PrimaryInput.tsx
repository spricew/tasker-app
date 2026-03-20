
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function PrimaryInput({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (<label className="text-base font-medium capitalize text-neutral-500">{label}</label>)}
            <input
                type="text"
                placeholder="text"
                className="py-2 px-4 rounded-full ring ring-outline-variant bg-surface-container-lowest"
                {...props}
            />
        </div>
    );
}