import { family } from '@/lib/landing'
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react'
import PrimaryButton from '@/components/ui/Buttons/PrimaryButton'
import ContactForm from '@/components/layout/ContactForm'
import Navbar from '@/components/layout/Navbar'

export default function Contact() {
    return (
        <div className='flex flex-col min-h-screen z-0'>
            <Navbar />
            <main className='relative flex flex-col items-center justify-center w-full flex-1 px-6 py-24'>
                <div className='relative z-10 flex flex-col items-center gap-y-8 max-w-xl text-center'>
                    <h1 className={`${family.className} text-5xl font-semibold tracking-tight md:text-6xl`}>
                        Contacto
                    </h1>
                    <p className='text-lg text-on-surface-variant leading-relaxed'>
                        ¿Tienes preguntas, sugerencias o simplemente quieres charlar? 
                        Nos encantaría escucharte.
                    </p>

                    <ContactForm />

                    <div className='flex flex-col gap-3 w-full max-w-sm mt-4'>
                        <span className='text-sm text-on-surface-variant'>Otras formas de contacto</span>
                        <div className='flex gap-3 justify-center'>
                            <a
                                href='mailto:hola@tasker.app'
                                className='flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/20 text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container-low'
                            >
                                <Mail size={16} strokeWidth={2.25} />
                                Email
                            </a>
                            <a
                                href='https://github.com/spricew/tasker-app/issues'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/20 text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container-low'
                            >
                                <MessageSquare size={16} strokeWidth={2.25} />
                                GitHub
                            </a>
                        </div>
                    </div>

                    <PrimaryButton
                        text='Volver al inicio'
                        Icon={<ArrowLeft strokeWidth={2.3} />}
                        href='/'
                        theme='secondary'
                    />
                </div>
            </main>
        </div>
    )
}
