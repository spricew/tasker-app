import type { Metadata } from 'next'
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react'
import PrimaryButton from '@/components/ui/Buttons/PrimaryButton'
import ContactForm from '@/components/layout/ContactForm'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
    title: 'Contacto',
    description: '¿Tienes preguntas, sugerencias o simplemente quieres charlar? Nos encantaría escucharte.',
}

export default function Contact() {
    return (
        <div className='flex flex-col min-h-screen z-0'>
            <Navbar />
            <main className='relative flex flex-col items-center justify-center w-full flex-1 px-6 py-16 zoom-in'>
                <div className='relative z-10 flex flex-col items-center gap-y-8 max-w-lg text-center   '>
                    <h1 className="text-5xl font-semibold tracking-tighter md:text-6xl">
                        Contacto
                    </h1>
                    <p className='text-lg text-on-surface-variant leading-relaxed'>
                        ¿Tienes preguntas, sugerencias o simplemente quieres charlar?
                        Nos encantaría escucharte.
                    </p>

                    <ContactForm />

                    <div className='flex flex-col gap-3 w-full max-w-sm mt-4'>
                        <span className='text-sm text-on-surface-variant'>Otras formas de contacto</span>
                        <div className='flex gap-x-2 justify-center'>
                            <PrimaryButton
                                text='Email'
                                theme='tertiary'
                                Icon={<Mail strokeWidth={2.25} size={16} />}
                                extraclass='text-sm'
                                href='mailto:heydercramvcreator@gmail.com'
                            />
                            <PrimaryButton
                                text='Github'
                                theme='tertiary'
                                Icon={<MessageSquare strokeWidth={2.25} size={16} />}
                                extraclass='text-sm rounded-full'
                                href='https://github.com/spricew'
                            />
                        </div>
                    </div>
                    <PrimaryButton
                        text='Volver al inicio'
                        Icon={<ArrowLeft strokeWidth={2.2} size={22} />}
                        href='/'
                        theme='secondary'
                    />
                </div>
            </main>
        </div>
    )
}
