'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { sileo } from 'sileo'
import PrimaryInput from '@/components/ui/PrimaryInput'
import PrimaryButton from '@/components/ui/Buttons/PrimaryButton'

const FORMSUBMIT_EMAIL = 'heydercramvcreator@gmail.com'

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch(`https://formsubmit.co/${FORMSUBMIT_EMAIL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                }),
            })

            if (!res.ok) throw new Error('Error al enviar')

            sileo.success({
                title: 'Mensaje enviado',
                duration: 3000,
                autopilot: {
                    expand: 0,
                    collapse: 2000,
                },
            })

            e.currentTarget.reset()
        } catch {
            sileo.error({
                title: 'Error al enviar',
                duration: 4500,
                autopilot: {
                    expand: 0,
                    collapse: 3500,
                },
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='flex flex-col gap-4 w-full px-8' onSubmit={handleSubmit}>
            <PrimaryInput
                name='name'
                label='Nombre'
                placeholder='Tu nombre'
                required
            />
            <PrimaryInput
                name='email'
                label='Correo'
                type='email'
                placeholder='tu@email.com'
                required
            />
            <PrimaryInput
                name='subject'
                label='Asunto'
                placeholder='¿En qué podemos ayudarte?'
                required
            />
            <div className='flex flex-col gap-1.5'>
                <label className='text-start text-base font-medium first-letter:capitalize text-neutral-500'>Mensaje</label>
                <textarea
                    name='message'
                    placeholder='Escribe tu mensaje aquí...'
                    rows={5}
                    required
                    className='py-2 px-4 rounded-2xl ring ring-outline-variant bg-surface-container-lowest focus:outline-0 resize-none'
                />
            </div>
            <PrimaryButton
                text={isLoading ? 'Enviando...' : 'Enviar mensaje'}
                Icon={<Send strokeWidth={2.25} size={17.5} />}
                type='submit'
                disabled={isLoading}
            />
        </form>
    )
}
