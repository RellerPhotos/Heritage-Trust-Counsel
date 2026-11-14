import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Clock3, FileText, Landmark, Mail, MapPin, Menu, Phone, ShieldCheck, Scale, TreeDeciduous, X } from 'lucide-react'
import './App.css'

const services = [
  { icon: FileText, title: 'Estate Planning', text: 'Thoughtful planning to help you organize your affairs, express your wishes, and prepare for the people and causes that matter to you.' },
  { icon: Landmark, title: 'Wills & Living Trusts', text: 'Understand how wills and living trusts work, and consider which planning tools may suit your circumstances and goals.' },
  { icon: Scale, title: 'Probate Administration', text: 'Guidance through probate, with careful attention to the responsibilities, deadlines, and family concerns involved.' },
  { icon: ShieldCheck, title: 'Trust Administration', text: 'Support for trustees navigating their duties and the practical work of administering a trust.' },
  { icon: TreeDeciduous, title: 'Estate Administration', text: 'Practical assistance with the details involved in settling an estate and carrying out a loved one’s wishes.' },
  { icon: FileText, title: 'Inheritance & Estate Disputes', text: 'A measured approach to beneficiary questions, inheritance concerns, and disputes involving estates or trusts.' },
]

const faqs = [
  ['What is the difference between a will and a living trust?', 'A will generally states how you want property handled after death and may need to be submitted to probate court. A living trust can hold assets during your lifetime and may allow assets properly transferred into it to pass without a probate court proceeding. The right approach depends on the assets, documents, and circumstances involved.'],
  ['Does every estate have to go through probate?', 'No. Whether a court probate case is needed depends on factors such as the type and value of property, how it is owned, beneficiary designations, and whether assets were properly transferred to a trust. Some estates may qualify for simplified procedures. The rules and thresholds can change, so get advice based on the current facts.'],
  ['When should I speak with an estate planning attorney?', 'You may wish to seek advice when family or financial circumstances change, when you acquire significant assets, when you are named as a trustee or executor, or when you want to put a plan in place.'],
  ['What should I bring to an initial consultation?', 'A short outline of your goals and questions is a useful start. If available, you may also bring existing wills or trust documents and a general picture of the assets or issues involved. Please do not email sensitive documents before confirming a secure method.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Estate planning', message: '' })
  const [website, setWebsite] = useState('')
  const [formStartedAt] = useState(() => Date.now())
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | 'loading'; message: string } | null>(null)

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formStatus?.type === 'loading') return
    setFormStatus({ type: 'loading', message: 'Sending your inquiry securely…' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website, formStartedAt }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.message || 'We could not send your inquiry right now. Please call or email the office directly.')
      setFormStatus({ type: 'success', message: 'Thank you. Your inquiry has been sent. The office will follow up using the contact details you provided.' })
      setForm({ name: '', email: '', phone: '', subject: 'Estate planning', message: '' })
      setWebsite('')
    } catch (error) {
      setFormStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please call or email the office directly.' })
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="topline"><span>CALIFORNIA ESTATE & PROBATE COUNSEL</span><span className="topline-right"><Clock3 size={13} /> Thoughtful guidance. Lasting peace of mind.</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Heritage Trust Counsel home"><img src="/heritage-trust-counsel-logo.svg" alt="Heritage Trust Counsel" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#services" onClick={closeMenu}>Legal Services</a><a href="#probate" onClick={closeMenu}>Probate</a><a href="#resources" onClick={closeMenu}>Resources</a><a href="#contact" className="nav-contact" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-image" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow light"><span /> COUNSEL FOR WHAT MATTERS MOST</div>
            <h1>Protecting Your<br /><em>Legacy.</em> Guiding<br />Your Family.</h1>
            <p>Clear, considered legal guidance for estate planning, probate, and trust matters in California.</p>
            <div className="hero-actions"><a className="button button-gold" href="#contact">Start a Conversation <ArrowUpRight size={16} /></a><a className="text-link light-link" href="#services">Explore our services <ArrowDown size={15} /></a></div>
          </div>
          <div className="hero-note"><span className="note-rule" /> PERSONAL ATTENTION. PURPOSEFUL COUNSEL.</div>
        </section>

        <section className="intro section-pad">
          <div className="intro-mark"><img src="/heritage-trust-counsel-favicon.svg" alt="" /></div>
          <div className="intro-copy"><div className="eyebrow"><span /> A MORE PERSONAL APPROACH</div><h2>Some things are too important<br />to leave <em>to chance.</em></h2></div>
          <p className="intro-text">Planning for the future, navigating the loss of a loved one, or carrying out the wishes of someone who has passed calls for more than legal knowledge. It calls for patience, perspective, and a steady hand.</p>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-heading"><div><div className="eyebrow"><span /> HOW WE CAN HELP</div><h2>Guidance through<br /><em>life’s legal transitions.</em></h2></div><p>Every family and every estate is different. Our work begins by understanding what matters to you, then helping you consider a practical path forward.</p></div>
          <div className="service-grid">{services.map(({ icon: Icon, title, text }, i) => <article className="service-card" key={title}><div className="service-top"><span className="service-number">0{i + 1}</span><Icon size={23} strokeWidth={1.35} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Ask about ${title}`}><ArrowUpRight size={18} /></a></article>)}</div>
        </section>

        <section className="feature" id="probate">
          <div className="feature-photo" role="img" aria-label="Legal documents arranged on a desk" />
          <div className="feature-copy"><div className="eyebrow light"><span /> WHEN THE WAY FORWARD FEELS UNCLEAR</div><h2>Steady guidance<br />through <em>probate.</em></h2><p>After a loss, the responsibilities that follow can feel overwhelming. Probate and estate administration involve important decisions, legal duties, and details that deserve careful attention.</p><p>Whether a court process is required depends on the property and circumstances involved. We aim to help you understand the process and identify questions to address.</p><a className="button button-outline" href="#contact">Discuss a probate matter <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-visual"><div className="about-photo" role="img" aria-label="Quiet professional office interior" /><div className="about-caption"><span>HERITAGE TRUST COUNSEL</span><strong>Guidance grounded<br />in what matters.</strong></div></div>
          <div className="about-copy"><div className="eyebrow"><span /> YOUR COUNSEL</div><h2>Personal counsel.<br /><em>Purposeful planning.</em></h2><p>Heritage Trust Counsel focuses on helping individuals and families think carefully about the future of their estates, understand probate, and navigate trust and inheritance matters.</p><p>For verified information about Robert Harrison’s professional background and bar admission, please contact the office.</p><div className="signature">Robert Harrison, Esq.<small>ATTORNEY</small></div><a className="text-link" href="#contact">Arrange an introduction <ArrowRight size={16} /></a></div>
        </section>

        <section className="values"><div className="value-item"><span>01</span><h3>Clarity</h3><p>Understand your options and the steps ahead.</p></div><div className="value-item"><span>02</span><h3>Care</h3><p>Be heard, respected, and treated as an individual.</p></div><div className="value-item"><span>03</span><h3>Purpose</h3><p>Keep your priorities at the center of the work.</p></div></section>

        <section className="resources section-pad" id="resources">
          <div className="section-heading"><div><div className="eyebrow"><span /> KNOW BEFORE YOU BEGIN</div><h2>A few things worth<br /><em>understanding.</em></h2></div><p>These official California resources provide general information to help you prepare questions. They are not a substitute for advice about your circumstances.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], i) => <div className={openFaq === i ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span className="faq-num">0{i + 1}</span><strong>{question}</strong><ChevronDown size={19} /></button>{openFaq === i && <p>{answer}</p>}</div>)}</div>
          <div className="resource-links">
            <a href="https://selfhelp.courts.ca.gov/wills-estates-probate" target="_blank" rel="noreferrer"><BookOpen size={19} /><span><strong>California Courts</strong><small>Wills, estates, and probate guide</small></span><ArrowUpRight size={16} /></a>
            <a href="https://selfhelp.courts.ca.gov/probate" target="_blank" rel="noreferrer"><Landmark size={19} /><span><strong>Probate in California</strong><small>Information about property after someone dies</small></span><ArrowUpRight size={16} /></a>
            <a href="https://www.calbar.ca.gov/legal-professionals/rules/rules-professional-conduct/current-rules-professional-conduct/chapter-7-information-about-legal-services" target="_blank" rel="noreferrer"><Scale size={19} /><span><strong>State Bar of California</strong><small>Rules concerning communications about legal services</small></span><ArrowUpRight size={16} /></a>
            <a href="https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch" target="_blank" rel="noreferrer"><ShieldCheck size={19} /><span><strong>Verify an attorney</strong><small>Check a California attorney’s license status and profile</small></span><ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-info"><div className="eyebrow light"><span /> LET’S START A CONVERSATION</div><h2>Take the first<br /><em>thoughtful step.</em></h2><p>Tell us a little about what brings you here. Please keep your first inquiry general and do not include confidential details.</p><a className="contact-line" href="tel:+19098139207"><Phone size={17} /><span><small>CALL THE OFFICE</small>(909) 813-9207</span><ArrowUpRight size={16} /></a><a className="contact-line" href="mailto:esqrobertmarrison@gmail.com"><Mail size={17} /><span><small>EMAIL</small>esqrobertmarrison@gmail.com</span><ArrowUpRight size={16} /></a><div className="contact-location"><MapPin size={17} /><span><small>LOCATION</small>California, United States<br /><i>Office address to be confirmed.</i></span></div></div>
          <div className="contact-form-wrap"><div className="form-heading"><span>01 / GET IN TOUCH</span><h3>How may we assist you?</h3><p>Share a few details below. Fields marked * are required.</p></div>
            <form onSubmit={submitContact}>
              <div className="form-row"><label>Your name *<input required autoComplete="name" maxLength={120} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></label><label>Email address *<input required type="email" autoComplete="email" maxLength={254} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label></div>
              <div className="form-row"><label>Phone number<input type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(000) 000-0000" /></label><label>I’m enquiring about<select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}><option>Estate planning</option><option>Wills & living trusts</option><option>Probate administration</option><option>Trust administration</option><option>Inheritance or estate dispute</option><option>Other</option></select></label></div>
              <label>How can we help? *<textarea required minLength={10} maxLength={4000} rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="A brief, general description of your inquiry..." /></label>
              <label className="website-field" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
              <button className="button button-dark" type="submit" disabled={formStatus?.type === 'loading'}>{formStatus?.type === 'loading' ? 'Sending…' : 'Send inquiry'} <ArrowUpRight size={16} /></button>
              {formStatus && <p className={`form-status ${formStatus.type}`} role="status" aria-live="polite">{formStatus.message}</p>}
              <p className="form-disclaimer">Please do not send confidential, financial, or time-sensitive information. Sending an inquiry does not create an attorney-client relationship. Form details are transmitted to the firm’s email delivery provider to deliver your message. See the <a href="/privacy.html">privacy notice</a>.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><a className="footer-brand" href="#home"><img src="/heritage-trust-counsel-logo.svg" alt="Heritage Trust Counsel" /></a><p>Protecting your legacy.<br />Guiding your family.</p><div className="footer-links"><a href="#about">About</a><a href="#services">Legal services</a><a href="#resources">Resources</a><a href="#contact">Contact</a><a href="/privacy.html">Privacy notice</a></div><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Heritage Trust Counsel. All rights reserved.</span><span>California, United States</span></div><p className="legal-note">The information on this website is for general informational purposes only and is not legal advice. Viewing this website or contacting the office through it does not create an attorney-client relationship. Do not send confidential or time-sensitive information until an attorney-client relationship has been established. No outcome is promised or guaranteed. Website content and advertising should be reviewed by the attorney for accuracy and compliance with applicable California professional responsibility and legal advertising requirements before publication.</p></footer>
    </>
  )
}

export default App
