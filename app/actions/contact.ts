'use server'
import { Resend } from "resend"

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

export async function sendContactEmail(data: ContactFormData) {
    const { name, email, subject, message } = data

    if (!name || !email || !subject || !message) {
        throw new Error('Todos los campos son obligatorios')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw new Error('El correo electrónico no es válido')
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
        from: 'Tasker <noreply@tasker.app>',
        to: 'hola@tasker.app',
        replyTo: email,
        subject: `[Contacto] ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    })

    console.log('Contact form submission:', { name, email, subject, message })

    return { success: true }
}
