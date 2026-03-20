interface PrimaryButtonProps {
    text: string;
}

export default function PrimaryButton({ text }: PrimaryButtonProps) {
    return (
        <button className="inline-flex items-center justify-center
        rounded-full px-4 py-2 bg-primary-container
        text-lg font-medium tracking-tight text-on-primary-container">
            {text}
        </button>
    );
}