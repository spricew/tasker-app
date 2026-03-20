interface PrimaryButtonProps {
    text: string;
}

export default function PrimaryButton({ text }: PrimaryButtonProps) {
    return (
        <button className="
        rounded-full px-4 py-2
        text-lg font-medium
        bg-primary-container text-white">
            {text}
        </button>
    );
}