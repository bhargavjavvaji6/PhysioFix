import React, { useState } from 'react';
import {
  Activity, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3,
  HeartPulse, MapPin, Menu, MessageCircle, Phone, ShieldCheck,
  Sparkles, Stethoscope, Waves, X, Dumbbell, Brain, PersonStanding,
  Bone, HandHeart, House, Accessibility, MoveUpRight, CalendarDays
} from 'lucide-react';

const CLINIC = 'PHYSIOFIX Physiotherapy and Rehabilitation';
const PHONE_DISPLAY = '+91 91484 19775';
const PHONE_LINK = '919148419775';
const ADDRESS = 'Sigma Arcade Building, 2nd floor, above Lenskart, Marathahalli, Bengaluru';
const WA_TEXT =
  "Hello PhysioFix! I would like to book an appointment for Personalized Physiotherapy with Dr. Zayan M R. Please share the available appointment slots. Thank you.";

const WA_LINK =
  `https://wa.me/${PHONE_LINK}?text=${encodeURIComponent(WA_TEXT)}`;

const treatments = [
  {
    image: "/images/services/back-pain.png",
    title: "Back Pain",
    desc: "Personalised care to support mobility and everyday movement.",
  },
  {
    image: "/images/services/knee-pain.png",
    title: "Knee Pain",
    desc: "Guided rehabilitation for knee discomfort and function.",
  },
  {
    image: "/images/services/neck-pain.png",
    title: "Neck Pain",
    desc: "Movement guidance and care for neck-related concerns.",
  },
  {
    image: "/images/services/shoulder-pain.png",
    title: "Shoulder Pain",
    desc: "Support for shoulder mobility, strength and recovery.",
  },
  {
    image: "/images/services/sports-injuries.png",
    title: "Sports Injuries",
    desc: "Rehabilitation to help you return to activity safely.",
  },
  {
    image: "/images/services/spine-problems.png",
    title: "Spine Problems",
    desc: "Orthopedic and spine-focused rehabilitation.",
  },
  {
    image: "/images/services/arthritis.png",
    title: "Arthritis",
    desc: "Movement and exercise support tailored to your needs.",
  },
  {
    image: "/images/services/home-visit.png",
    title: "Home Visit Physiotherapy",
    desc: "Ask our team about home visits in your area.",
  },
  {
    image: "/images/services/muscle-joint-pain.png",
    title: "Muscle & Joint Pain",
    desc: "Individualised support for stiffness, pain and movement.",
  },
  {
    image: "/images/services/post-surgery.png",
    title: "Post-Surgery Rehabilitation",
    desc: "A guided rehabilitation plan tailored to your recovery.",
  },
  {
    image: "/images/services/neurological.png",
    title: "Neurological Rehabilitation",
    desc: "Individualised movement and functional rehabilitation.",
  },
  {
    image: "/images/services/womens-health.png",
    title: "Women's Health Physiotherapy",
    desc: "Physiotherapy support tailored to selected women's health needs.",
  },
  {
    image: "/images/services/geriatric.png",
    title: "Geriatric Physiotherapy",
    desc: "Support for balance, mobility, strength and independence.",
  },
  {
    image: "/images/services/posture-correction.png",
    title: "Posture Correction",
    desc: "Movement education and exercises for posture-related concerns.",
  },
];

const benefits = [
  ['Evidence-based physiotherapy', 'Care informed by your assessment and needs.'],
  ['Personalised one-to-one sessions', 'Treatment plans shaped around your goals.'],
  ['Manual therapy techniques', 'Hands-on techniques when clinically appropriate.'],
  ['Dry needling therapy', 'Discuss suitability with your physiotherapist.'],
  ['Cupping therapy', 'Ask whether this approach fits your care plan.'],
  ['Shockwave therapy', 'Treatment options discussed after assessment.'],
  ['Advanced pain management', 'A considered approach to managing symptoms.'],
  ['Orthopedic & spine rehabilitation', 'Focused care for spine and joint conditions.'],
  ['Sports recovery programmes', 'Support for strength, mobility and return to activity.'],
  ['Modern physiotherapy equipment', 'Clinic-based options depending on your treatment plan.'],
  ['Comfortable treatment rooms', 'A supportive environment for your appointments.'],
  ['Convenient Marathahalli location', 'Find us above Lenskart at Sigma Arcade.'],
];

const faqs = [
  { q: 'Where can I find a physiotherapy clinic in Bangalore?', a: 'PhysioFix Physiotherapy and Rehabilitation is located in Marathahalli, Bengaluru, at Sigma Arcade Building, 2nd floor, above Lenskart. We provide personalised physiotherapy and rehabilitation for back pain, knee pain, neck pain, sports injuries and other musculoskeletal concerns. Call or WhatsApp us to discuss your needs and plan a visit.' },
  { q: 'Can physiotherapy help with back pain, neck pain and knee pain?', a: 'Physiotherapy may help manage back pain, neck pain and knee pain through appropriate exercises, mobility training and individualised treatment plans. Your physiotherapist will assess your symptoms, movement and goals before recommending suitable care. Results vary depending on the underlying condition and individual circumstances.' },
  { q: 'Does PhysioFix provide home visit physiotherapy in Bangalore?', a: 'Home-visit physiotherapy can be helpful for people who have difficulty travelling to a clinic. Please contact PhysioFix to confirm whether home physiotherapy is available in your location, discuss your treatment requirements and check appointment options before making arrangements.' },
  { q: 'Where can I find sports injury physiotherapy in Bangalore?', a: 'PhysioFix offers rehabilitation support for sports injuries, with treatment plans intended to help patients work towards improved strength, flexibility and mobility. Your plan and progression will depend on your injury, assessment and activity goals. Contact the clinic to discuss your situation and arrange an assessment.' },
  { q: 'Can physiotherapy help after surgery?', a: 'Post-surgery physiotherapy can support recovery by working on mobility, strength and functional movement. The timing and type of rehabilitation depend on your surgery, your surgeon’s guidance and your recovery progress. Your physiotherapist will tailor recommendations to your circumstances and coordinate with your care team when appropriate.' },
  { q: 'Does physiotherapy help with arthritis, muscle pain or joint stiffness?', a: 'Physiotherapy may help manage arthritis symptoms, muscle pain and joint stiffness through therapeutic exercise, mobility training and suitable pain-management approaches. Care is tailored to your condition, physical abilities and goals. An assessment helps identify appropriate options; it cannot guarantee a particular outcome.' },
  { q: 'Is physiotherapy helpful for neurological conditions and older adults?', a: 'For eligible patients, neurological and geriatric physiotherapy may support balance, strength, coordination, mobility and independence. Rehabilitation exercises are selected according to the person’s needs and abilities after assessment. Please contact the clinic to discuss the condition and confirm whether the required service is available.' },
  { q: 'Can physiotherapy improve posture and women’s health concerns?', a: 'Physiotherapy may help with posture-related concerns and selected women’s health needs through targeted exercise, movement education and individualised rehabilitation. The appropriate approach depends on your symptoms and professional assessment. Contact the clinic to discuss your concerns and find out whether an appointment is suitable.' },
];

const reviews = [
  'The physiotherapist explained my condition clearly and guided me through a personalised treatment plan.',
  'My movement was assessed carefully, and the exercises and next steps were explained in an easy-to-understand way.',
  'I appreciated the individual attention and clear guidance throughout my physiotherapy sessions.',
  'The therapist explained suitable exercises and gave me helpful guidance on posture and everyday movement.',
];

function Brand() {
  return <a className="brand" href="#home" aria-label="PhysioFix home">
    <span className="brand-icon"><img src="/images/physiofix-logo.png" alt="PhysioFix logo" />
    </span>
    <span className="brand-word">PHYSIO<span>FIX</span><small>PHYSIOTHERAPY & REHABILITATION</small></span>
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [sent, setSent] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  function submitAppointment(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const concern = data.get('concern');
    const preferred = data.get('preferred');
    const text = `Hello PhysioFix, I would like to book an appointment with Dr. Zayan M R.%0AName: ${encodeURIComponent(name)}%0AConcern: ${encodeURIComponent(concern)}%0APreferred time: ${encodeURIComponent(preferred || 'Flexible')}`;
    setSent(true);
    window.open(`https://wa.me/${PHONE_LINK}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  return <div className="app">
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={13} /> Marathahalli, Bengaluru</span><span className="topbar-separator"></span><a href={`tel:+${PHONE_LINK}`}><Phone size={13} /> {PHONE_DISPLAY}</a><a className="topbar-book" href="#contact">Book your appointment <ArrowUpRight size={13} /></a></div></div>
    <header className="header"><div className="container nav-inner">
      <Brand />
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About us</a><a href="#services" onClick={closeMenu}>Services</a><a href="#why-us" onClick={closeMenu}>Why PhysioFix</a><a href="#reviews" onClick={closeMenu}>Reviews</a><a href="#faq" onClick={closeMenu}>FAQ</a>
        <a className="nav-appointment" href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Book appointment <ArrowRight size={15} /></a>
      </nav>
    </div></header>

    <main>
      <section className="hero" id="home"><div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"></span> YOUR MOVEMENT. OUR PRIORITY.</div>
          <h2>Move better, Feel stronger,<span>Live pain-free.</span></h2>
          <h1>Your trusted physiotherapy clinic in Bangalore.</h1>
          <p className="hero-lede">
            PhysioFix Health offers personalised physiotherapy and rehabilitation to help manage back pain, neck pain, joint problems and sports injuries. Get expert guidance and a treatment plan tailored to your recovery goals.</p>
          <div className="hero-buttons"><a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} /> Book an appointment <ArrowRight size={16} /></a><a className="btn btn-outline" href="#contact">Contact us <MoveUpRight size={16} /></a></div>
          <div className="hero-assurance"><span className="assurance-icon"><ShieldCheck size={20} /></span><div><b>Personalised, patient-focused care</b><small>Every treatment plan starts with understanding you.</small></div></div>
        </div>

      </div><div className="container hero-bottom"><span>ORTHOPEDIC REHABILITATION</span><i></i><span>SPINE CARE</span><i></i><span>SPORTS INJURY RECOVERY</span><i></i><span>PERSONALISED TREATMENT</span></div></section>

      <section className="quick-benefits"><div className="container quick-grid"><div className="quick-item"><span><ShieldCheck /></span><div><b>Evidence-based care</b><small>Assessment-led treatment</small></div></div><div className="quick-item"><span><HandHeart /></span><div><b>Individual attention</b><small>Plans tailored to your goals</small></div></div><div className="quick-item"><span><Stethoscope /></span><div><b>Expert guidance</b><small>Support through recovery</small></div></div><div className="quick-item"><span><MapPin /></span><div><b>Marathahalli location</b><small>Bengaluru, Karnataka</small></div></div></div></section>

      <section className="section about-section" id="about"><div className="container about-grid">
        <div className="doctor-card"><div className="doctor-card-top"><span className="mini-label">MEET YOUR PHYSIOTHERAPIST</span><span className="doctor-card-star">✳</span></div><div className="doctor-portrait"><img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=85" alt="Professional clinician portrait" /></div><div className="doctor-card-bottom"><div><h3>Dr. Zayan M R</h3><p>Bachelor of Physiotherapy (BPT)</p><small>Orthopedic Rehabilitation & Spine Specialist</small></div><span className="doctor-check"><Check size={19} /></span></div><div className="doctor-card-ribbon"><Activity size={17} /> 4+ years of physiotherapy experience</div></div>
        <div className="about-copy"><div className="eyebrow"><span className="eyebrow-line"></span> ABOUT PHYSIOFIX HEALTH</div><h2>Helping you get back to <span>what moves you.</span></h2><p className="lead">Meet Dr. Zayan M R — your partner in movement, rehabilitation and recovery.</p><p>Dr. Zayan M R is a dedicated physiotherapist with over 4 years of experience in orthopedic rehabilitation, spine care, sports injury recovery and evidence-based physiotherapy. At PhysioFix Health, Bengaluru, he focuses on personalised treatment plans designed to improve mobility, manage pain and enhance overall physical function.</p><p>He specialises in orthopedic rehabilitation, spine care, manual therapy and sports injury recovery, providing personalised physiotherapy for back pain, neck pain, knee pain and joint problems.</p><div className="about-points"><span><Check size={16} /> Individualised treatment plans</span><span><Check size={16} /> Spine and orthopedic rehabilitation</span><span><Check size={16} /> Mobility and functional movement</span></div><a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noopener noreferrer">Consult Dr. Zayan <ArrowRight size={16} /></a></div>
      </div></section>
      <section className="quick-benefits"><div className="container quick-grid"><div className="quick-item"><span><ShieldCheck /></span><div><b>4 + Years of Experience</b><small>Assessment-led treatment</small></div></div><div className="quick-item"><span><HandHeart /></span><div><b>Thousands of Patients Treated</b></div></div><div className="quick-item"><span><Stethoscope /></span><div><b>Advanced Regenerative Treatments</b></div></div><div className="quick-item"><span><MapPin /></span><div><b>Patient-Centric Approach</b></div></div></div></section>

      <section className="services-section section" id="services"><div className="container"><div className="section-heading"><div className="eyebrow"><span className="eyebrow-line"></span> PHYSIOTHERAPY SERVICES</div><h2>Care for every <span>step forward.</span></h2></div><p>From everyday aches to sports recovery, explore physiotherapy services designed around your movement and rehabilitation goals.</p></div>
        <div className="treatments-grid">
          {treatments.map(({ image, title, desc }, i) => (
            <a
              href="#contact"
              className="treatment-card"
              key={title}
            >
              <span className="treatment-index">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="treatment-illustration">
                <img
                  src={image}
                  alt={`${title} medical illustration`}
                  loading="lazy"
                />
              </div>

              <h3>{title}</h3>

              <p>{desc}</p>

              <span className="treatment-arrow">
                <ArrowUpRight size={19} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="why-section section" id="why-us"><div className="container"><div className="why-heading"><div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> THE PHYSIOFIX DIFFERENCE</div><h2>Why patients choose <span>PhysioFix.</span></h2><p>Care that combines thoughtful assessment, individual attention and a plan shaped around your needs.</p></div><div className="benefits-grid">{benefits.map(([title, desc], i) => <div className="benefit-card" key={title}><div className="benefit-number">{String(i + 1).padStart(2, '0')}</div><div className="benefit-check"><Check size={17} /></div><h3>{title}</h3><p>{desc}</p></div>)}</div><div className="why-cta"><span>Have a question about which treatment is right for you?</span><a href={WA_LINK} target="_blank" rel="noopener noreferrer">Talk to PhysioFix <ArrowRight size={16} /></a></div></div></section>

      <section className="section reviews-section" id="reviews"><div className="container"><div className="section-heading review-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> PATIENT EXPERIENCES</div><h2>Care that starts with <span>listening.</span></h2></div><p>Clear explanations and individual attention are important parts of a positive care experience.</p></div><div className="reviews-grid">{reviews.map((review, i) => <article className="review-card" key={review}><div className="review-stars" aria-label="Patient review">★★★★★</div><span className="quote-mark">“</span><p>{review}</p><div className="review-person"><span className="review-avatar">{['P', 'A', 'S', 'R'][i]}</span><div><b>Patient feedback</b><small>Physiotherapy visit</small></div><ShieldCheck size={17} className="review-verified" /></div></article>)}</div><p className="review-disclaimer">Illustrative review-style copy based on the supplied content. Replace with verified patient reviews and obtain permission before publishing.</p></div></section>

      <section className="section gallery-section" id="gallery">
        <div className="container">
          <div className="section-heading gallery-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                INSIDE PHYSIOFIX
              </div>

              <h2>
                A closer look at <span>our clinic.</span>
              </h2>
            </div>

            <p>
              Explore our clinic, reception and rehabilitation facilities
              in Marathahalli, Bengaluru.
            </p>
          </div>

          <div className="clinic-gallery">
            <a
              className="gallery-item gallery-item-feature"
              href="/images/gallery/clinic-signboard.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gallery/clinic-signboard.jpg"
                alt="PhysioFix clinic signboard and entrance"
                loading="lazy"
              />

              <span className="gallery-caption">
                <b>Our Clinic</b>
                <small>Find us at Sigma Arcade</small>
              </span>
            </a>

            <a
              className="gallery-item gallery-item-reception"
              href="/images/gallery/reception.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gallery/reception.jpg"
                alt="PhysioFix clinic reception"
                loading="lazy"
              />

              <span className="gallery-caption">
                <b>Reception</b>
                <small>A warm welcome</small>
              </span>
            </a>

            <a
              className="gallery-item"
              href="/images/gallery/rehab-space-1.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gallery/rehab-space-1.jpg"
                alt="Physiotherapy rehabilitation area"
                loading="lazy"
              />

              <span className="gallery-caption">
                <b>Rehabilitation Space</b>
                <small>Movement and exercise</small>
              </span>
            </a>

            <a
              className="gallery-item"
              href="/images/gallery/rehab-space-2.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gallery/rehab-space-2.jpg"
                alt="Physiotherapy exercise equipment"
                loading="lazy"
              />

              <span className="gallery-caption">
                <b>Exercise Equipment</b>
                <small>Training for mobility</small>
              </span>
            </a>

            <a
              className="gallery-item"
              href="/images/gallery/rehab-space-3.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gallery/rehab-space-3.jpg"
                alt="PhysioFix strength and balance training area"
                loading="lazy"
              />

              <span className="gallery-caption">
                <b>Recovery in Motion</b>
                <small>Strength, balance and mobility</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="process-section"><div className="container process-grid"><div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR PATH TO RECOVERY</div><h2>One step at a time.<br /><span>With you throughout.</span></h2><p>Start with a conversation about your symptoms and goals. Your physiotherapist can guide you through suitable next steps after an individual assessment.</p><a className="btn btn-dark" href={WA_LINK} target="_blank" rel="noopener noreferrer">Plan your visit <ArrowRight size={16} /></a></div><div className="process-steps"><div className="process-step"><span>01</span><div><h3>Talk about your goals</h3><p>Share your concerns, activity needs and questions.</p></div></div><div className="process-step"><span>02</span><div><h3>Get an individual assessment</h3><p>Understand your movement and discuss suitable care options.</p></div></div><div className="process-step"><span>03</span><div><h3>Follow a tailored plan</h3><p>Work towards progress with guidance suited to your needs.</p></div></div></div></div></section>

      <section className="section faq-section" id="faq"><div className="container faq-layout"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-line"></span> FREQUENTLY ASKED QUESTIONS</div><h2>Good to know<br /><span>before you visit.</span></h2><p>Have a question about physiotherapy? Here are some helpful starting points.</p><div className="faq-help"><MessageCircle size={20} /><div><b>Still need help?</b><a href={WA_LINK} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp <ArrowUpRight size={14} /></a></div></div></div><div className="faq-list">{faqs.map((faq, i) => <article className={`faq-item ${faqOpen === i ? 'faq-active' : ''}`} key={faq.q}><button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}><span className="faq-number">{String(i + 1).padStart(2, '0')}</span><span className="faq-question">{faq.q}</span><ChevronDown size={19} /></button>{faqOpen === i && <p>{faq.a}</p>}</article>)}</div></div></section>

    </main>

    <div className="floating-actions" aria-label="Quick contact buttons"><a href={`tel:+${PHONE_LINK}`} className="floating-button floating-call" aria-label="Call PhysioFix"><Phone size={21} /><span className="float-label">Call PhysioFix</span></a><a href={WA_LINK} target="_blank" rel=" noopener noreferrer" className="floating-button floating-wa" aria-label="WhatsApp PhysioFix"><MessageCircle size={24} /><span className="float-label">Chat on WhatsApp</span><span className="pulse-ring"></span></a></div>
    <div className="mobile-contact-bar"><a href={`tel:+${PHONE_LINK}`}><Phone size={17} /> Call clinic</a><a href={WA_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp</a></div>
  </div>;
}

export default App;
