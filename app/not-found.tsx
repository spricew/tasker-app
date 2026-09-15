import { HomeIcon } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { MeshBackground } from '@/components/layout/MeshBackground'
import { family } from '@/lib/landing'
import PrimaryButton from '@/components/ui/Buttons/PrimaryButton'

export default function NotFound() {
    return (
        <div className='flex flex-col h-screen z-0'>
            <Navbar extraClass='absolute'/>
            <main className='relative flex flex-col items-center justify-center w-full flex-1 gap-y-6'>
                <MeshBackground />
                <h2 className="font-semibold text-9xl tracking-tighter">404</h2>
                <h3 className="-mt-6 font-semibold text-4xl tracking-tighter">Página no encontrada</h3>
                <p className='text-lg font-medium text-on-surface-variant'>La página que buscas no existe o fue movida.</p>
                <PrimaryButton
                    text='Regresar al inicio'
                    Icon={<HomeIcon strokeWidth={2.3} />}
                    href='/'
                />
            </main>
        </div>
    )
}