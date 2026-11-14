import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import contactHandler from './api/contact.ts'

function localContactApi(): Plugin {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        let body = ''
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString()
          if (body.length > 16_000) {
            res.statusCode = 413
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: 'Your message is too large. Please shorten it and try again.' }))
            req.destroy()
          }
        })
        req.on('end', () => {
          const request = Object.assign(req, { body })
          const response = {
            status(code: number) { res.statusCode = code; return this },
            json(payload: Record<string, string>) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
            },
            setHeader(name: string, value: string) { res.setHeader(name, value) },
          }
          void contactHandler(request as never, response)
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), localContactApi()],
})
