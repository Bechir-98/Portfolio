import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_RECEIVERID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATEID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLICKEY

interface ContactMessage {
  name: string
  email: string
  message: string
}

export function isEmailJsConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
}

export async function sendContactMessage({ name, email, message }: ContactMessage) {
  if (!isEmailJsConfigured()) {
    throw new Error('EmailJS is not configured.')
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: name, reply_to: email, message },
    { publicKey: PUBLIC_KEY },
  )
}
