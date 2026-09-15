import Image from 'next/image'
import { HomeIcon } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import PrimaryButton from '@/components/ui/Buttons/PrimaryButton'

export default function NotFound() {
    return (
        <div className='flex flex-col h-screen z-0'>
            {/* <Image src='/images/background-auth.jpg' alt="" priority width={1200} height={1200}
                className="absolute inset-0 w-full h-full object-cover z-[-1]" /> */}
            <Navbar />
            <main className='flex flex-col items-center justify-center w-full h-full gap-y-6'>
                <h2 className='text-8xl tracking-tighter '>404 Not Found</h2>
                    {/* <p>El recurso solicitado fue movido o no existe</p> */}
                <PrimaryButton
                    text='Regresar al inicio'
                    Icon={<HomeIcon strokeWidth={2.3} />}
                />
            </main>
        </div>
    )
}