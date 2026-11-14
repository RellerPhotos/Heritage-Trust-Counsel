import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Clock3, FileText, Landmark, Mail, MapPin, Menu, Phone, ShieldCheck, Scale, TreeDeciduous, X } from 'lucide-react'
import './App.css'

const services = [
  { icon: FileText, title: 'Estate Planning', text: 'Thoughtful planning to help you organise your affairs, express your wishes, and prepare for the people and causes that matter to you.' },
  { icon: Landmark, title: 'Wills & Living Trusts', text: 'Explore the role of wills and living trusts in creating a clear, considered plan for the future.' },
  { icon: Scale, title: 'Probate Administration', text: 'Guidance through the probate process, with careful attention to responsibilities, deadlines, and family concerns.' },
  { icon: ShieldCheck, title: 'Trust Administration', text: 'Support for trustees navigating their duties and the practical work of administering a trust.' },
  { icon: TreeDeciduous, title: 'Estate Administration', text: 'Practical assistance with the many details involved in settling an estate and carrying out a loved one’s wishes.' },
  { icon: FileText, title: 'Inheritance & Estate Disputes', text: 'A measured approach to beneficiary questions, inheritance concerns, and disputes involving estates or trusts.' },
]

const faqs = [
  ['What is the difference between a will and a living trust?', 'A will and a living trust are different estate-planning tools, and each works differently. Which may be appropriate depends on your circumstances, goals, assets, and family situation. An attorney can help you understand the options.'],
  ['Does every estate have to go through probate?', 'Not necessarily. Whether probate is required depends on factors such as how assets are owned, the value and type of property, and whether a valid trust or other arrangements apply. Individual circumstances matter.'],
  ['When should I speak with an estate planning attorney?', 'You may wish to seek advice when your family or financial circumstances change, when you acquire significant assets, when you are named as a trustee or executor, or when you want to put a plan in place.'],
  ['What should I bring to an initial consultation?', 'A short outline of your goals and questions is a useful start. If available, you may also bring existing wills or trust documents and a general picture of the assets or issues involved. Please do not email sensitive documents before confirming a secure method.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Estate planning', message: '' })

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nSubject: ${form.subject}\n\n${form.message}`
    window.location.href = `mailto:esqrobertmarrison@gmail.com?subject=${encodeURIComponent('Website enquiry: ' + form.subject)}&body=${encodeURIComponent(body)}`
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="topline"><span>CALIFORNIA ESTATE & PROBATE COUNSEL</span><span className="topline-right"><Clock3 size={13} /> Thoughtful guidance. Lasting peace of mind.</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Heritage Trust Counsel home">
          <img src="/heritage-trust-counsel-logo.svg" alt="Heritage Trust Counsel" />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#services" onClick={closeMenu}>Legal Services</a><a href="#probate" onClick={closeMenu}>Probate</a><a href="#resources" onClick={closeMenu}>Resources</a><a href="#contact" className="nav-contact" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow light"><span /> COUNSEL FOR WHAT MATTERS MOST</div>
            <h1>Protecting Your<br /><em>Legacy.</em> Guiding<br />Your Family.</h1>
            <p>Clear, considered legal guidance for estate planning, probate, and trust matters in California.</p>
            <div className="hero-actions"><a className="button button-gold" href="#contact">Schedule a Conversation <ArrowUpRight size={16} /></a><a className="text-link light-link" href="#services">Explore our services <ArrowDown size={15} /></a></div>
          </div>
          <div className="hero-note"><span className="note-rule" /> PERSONAL ATTENTION. PURPOSEFUL COUNSEL.</div>
          <div className="hero-index">01 <span /> 06</div>
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
          <div className="feature-photo" />
          <div className="feature-copy"><div className="eyebrow light"><span /> WHEN THE WAY FORWARD FEELS UNCLEAR</div><h2>Steady guidance<br />through <em>probate.</em></h2><p>After a loss, the responsibilities that follow can feel overwhelming. Probate and estate administration involve important decisions, legal duties, and details that deserve careful attention.</p><p>We aim to make the process easier to understand, helping you identify the next steps and approach each responsibility with greater confidence.</p><a className="button button-outline" href="#contact">Discuss a probate matter <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-visual"><div className="about-photo" /><div className="about-caption"><span>HERITAGE TRUST COUNSEL</span><strong>Guidance grounded<br />in what matters.</strong></div></div>
          <div className="about-copy"><div className="eyebrow"><span /> YOUR COUNSEL</div><h2>Personal counsel.<br /><em>Purposeful planning.</em></h2><p>Heritage Trust Counsel is focused on helping individuals and families think carefully about the future of their estates, understand the probate process, and navigate trust and inheritance matters.</p><p>Attorney Robert Harrison, Esq. believes that good counsel starts with listening. Every conversation is an opportunity to understand your priorities, explain your options, and help you make informed decisions.</p><div className="signature">Robert Harrison, Esq.<small>ATTORNEY</small></div><a className="text-link" href="#contact">Arrange an introduction <ArrowRight size={16} /></a></div>
        </section>

        <section className="values">
          <div className="value-item"><span>01</span><h3>Clarity</h3><p>Understand your options and the steps ahead.</p></div><div className="value-item"><span>02</span><h3>Care</h3><p>Be heard, respected, and treated as an individual.</p></div><div className="value-item"><span>03</span><h3>Purpose</h3><p>Keep your priorities at the centre of the work.</p></div>
        </section>

        <section className="resources section-pad" id="resources">
          <div className="section-heading"><div><div className="eyebrow"><span /> KNOW BEFORE YOU BEGIN</div><h2>A few things worth<br /><em>understanding.</em></h2></div><p>Starting with the right questions can make a complex situation feel more manageable. Here are a few common questions about estate planning and probate.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], i) => <div className={openFaq === i ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="faq-num">0{i + 1}</span><strong>{question}</strong><ChevronDown size={19} /></button>{openFaq === i && <p>{answer}</p>}</div>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-info"><div className="eyebrow light"><span /> LET’S START A CONVERSATION</div><h2>Take the first<br /><em>thoughtful step.</em></h2><p>Tell us a little about what brings you here. We’ll help you understand how to take the next step.</p><a className="contact-line" href="tel:+19098139207"><Phone size={17} /><span><small>CALL OUR OFFICE</small>(909) 813-9207</span><ArrowUpRight size={16} /></a><a className="contact-line" href="mailto:esqrobertmarrison@gmail.com"><Mail size={17} /><span><small>EMAIL</small>esqrobertmarrison@gmail.com</span><ArrowUpRight size={16} /></a><div className="contact-location"><MapPin size={17} /><span><small>LOCATION</small>California, United States<br /><i>Office address available upon confirmation.</i></span></div></div>
          <div className="contact-form-wrap"><div className="form-heading"><span>01 / GET IN TOUCH</span><h3>How may we assist you?</h3><p>Share a few details below. Fields marked * are required.</p></div><form onSubmit={submitContact}><div className="form-row"><label>Your name *<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></label><label>Email address *<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label></div><div className="form-row"><label>Phone number<input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(000) 000-0000" /></label><label>I'm enquiring about<select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}><option>Estate planning</option><option>Wills & living trusts</option><option>Probate administration</option><option>Trust administration</option><option>Inheritance or estate dispute</option><option>Other</option></select></label></div><label>How can we help? *<textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="A brief description of your enquiry..." /></label><button className="button button-dark" type="submit">Prepare email enquiry <ArrowUpRight size={16} /></button><p className="form-disclaimer">Submitting opens your email application with your message prepared. Please do not include confidential or sensitive information in an initial enquiry.</p></form></div>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><a className="footer-brand" href="#home"><img src="/heritage-trust-counsel-logo.svg" alt="Heritage Trust Counsel" /></a><p>Protecting your legacy.<br />Guiding your family.</p><div className="footer-links"><a href="#about">About</a><a href="#services">Legal services</a><a href="#resources">Resources</a><a href="#contact">Contact</a></div><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Heritage Trust Counsel. All rights reserved.</span><span>California, United States</span></div><p className="legal-note">The information on this website is for general informational purposes only and is not legal advice. Viewing this website or contacting the firm through it does not create an attorney-client relationship. Do not send confidential or time-sensitive information until an attorney-client relationship has been established. Past results, if any, do not guarantee a similar outcome. Website content should be reviewed for accuracy and compliance with applicable California professional responsibility and attorney advertising requirements before publication.</p></footer>
    </>
  )
}

export default App
