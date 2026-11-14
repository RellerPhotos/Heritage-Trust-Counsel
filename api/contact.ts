type ContactPayload = { name?: unknown; email?: unknown; phone?: unknown; subject?: unknown; message?: unknown; website?: unknown; formStartedAt?: unknown }
type ApiRequest = { method?: string; headers: Record<string, string | string[] | undefined>; body?: ContactPayload | string }
type ApiResponse = { status: (code: number) => ApiResponse; json: (body: Record<string, string>) => void; setHeader: (name: string, value: string) => void }
const subjects = new Set(['Estate planning','Wills & living trusts','Probate administration','Trust administration','Inheritance or estate dispute','Other'])
const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : ''

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ message: 'Method not allowed.' }) }
  res.setHeader('Cache-Control', 'no-store')
  const originHeader = req.headers.origin
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN
  if (allowedOrigin && origin && origin !== allowedOrigin) return res.status(403).json({ message: 'This request could not be accepted.' })
  let data: ContactPayload
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}) } catch { return res.status(400).json({ message: 'Please check the form and try again.' }) }
  if (clean(data.website, 200)) return res.status(200).json({ message: 'Enquiry received.' })
  const name = clean(data.name, 120), email = clean(data.email, 254).toLowerCase(), phone = clean(data.phone, 40)
  const subject = clean(data.subject, 80), message = clean(data.message, 4000), startedAt = Number(data.formStartedAt)
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subjects.has(subject) || message.length < 10) return res.status(400).json({ message: 'Please check your name, email, enquiry topic, and message.' })
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) return res.status(400).json({ message: 'Please refresh the page and try submitting your enquiry again.' })
  const apiKey = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || 'esqrobertmarrison@gmail.com'
  if (!apiKey || !from) return res.status(503).json({ message: 'The online enquiry service is being configured. Please call (909) 813-9207 or email esqrobertmarrison@gmail.com directly.' })
  const text = ['New website enquiry for Heritage Trust Counsel','',`Name: ${name}`,`Email: ${email}`,`Phone: ${phone || 'Not provided'}`,`Topic: ${subject}`,'','Message:',message,'','This is an initial enquiry, not a secure document-delivery channel.'].join('\n')
  try {
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Website enquiry: ${subject}`, text }) })
    if (!response.ok) return res.status(502).json({ message: 'We could not send your enquiry right now. Please call or email the office directly.' })
    return res.status(200).json({ message: 'Enquiry received.' })
  } catch { return res.status(502).json({ message: 'We could not send your enquiry right now. Please call or email the office directly.' }) }
}
