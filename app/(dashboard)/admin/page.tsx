import PrimaryButton from "@/components/ui/PrimaryButton";

export default function Adminr() {
    return (
        <div className="flex flex-col flex-1 px-18 py-12">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-4xl tracking-tighter font-bold">Admin Dashboard</h1>
                    <p>Officia proident ut dolore magna qui consectetur mollit et id enim fugiat sint nisi labore.</p>
                </div>

                <PrimaryButton
                    text="Crear usuario"
                />
            </div>
        </div>
    );
}