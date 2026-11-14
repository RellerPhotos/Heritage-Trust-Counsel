# Heritage Trust Counsel

Responsive informational website for Heritage Trust Counsel, built with React, TypeScript, Vite, and CSS.

## Local development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Contact form configuration

The form posts to the Vercel serverless function at `/api/contact`. This is a Vercel-compatible implementation; confirm the client’s hosting platform before activation. It sends inquiries through Resend and does not write them to a website database.

Configure these as **server-side environment variables** in the client's hosting account:

- `RESEND_API_KEY`: API key from the client's own Resend account.
- `CONTACT_FROM_EMAIL`: sender address on a domain verified in that Resend account.
- `CONTACT_TO_EMAIL`: defaults to the firm's supplied email address.
- `CONTACT_ALLOWED_ORIGIN`: the final approved website origin, e.g. `https://example.com`.

See `.env.example` for the names. Never place secrets in `VITE_` variables or commit a real `.env` file. Do not reuse credentials or sending domains from another project. The sender domain must be verified before the form can deliver messages. Add hosting-provider rate limiting / bot protection before public launch.

## Before public launch

- Verify the attorney's full name, professional biography, education, bar admission, and current status directly with the attorney / State Bar.
- Confirm the firm's physical office address and approved service area.
- Obtain client approval for photography and all marketing copy.
- Have the attorney review all practice-area descriptions, FAQs, disclaimers, privacy notice, and California attorney advertising compliance.
- Confirm the hosting provider, final domain, email delivery settings, and privacy practices.
- Add any further privacy disclosures required by the firm's actual operations and applicable law.

## Important

The website is informational and is not legal advice. It does not create an attorney-client relationship. The contact form is for general initial enquiries only and is not a secure document portal. The privacy notice is a draft and must be reviewed by the firm.
