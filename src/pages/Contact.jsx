import { useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { useTranslation } from 'react-i18next';

const SUBJECTS = [
  { key: 'partnership', lt: 'Partnerystė', en: 'Partnership' },
  { key: 'membership', lt: 'Narystė', en: 'Membership' },
  { key: 'sponsorship', lt: 'Sponsorystė', en: 'Sponsorship' },
  { key: 'other', lt: 'Kita', en: 'Other' }
];

const CHANNELS = [
  { label: 'Email', value: 'perkunasrt@gmail.com', href: 'mailto:perkunasrt@gmail.com', icon: 'mail' },
  { label: 'Instagram', value: '@perkunas_racing_ktu', href: 'https://www.instagram.com/perkunas_racing_ktu/', icon: 'photo_camera' },
  { label: 'LinkedIn', value: 'Perkūnas Racing', href: 'https://www.linkedin.com/company/perkunasrt/', icon: 'work' },
  { label: 'Location', value: 'KTU · Kaunas, Lithuania', href: 'https://maps.google.com/?q=Kaunas+University+of+Technology', icon: 'location_on' }
];

// ---------------------------------------------------------------------------
// FormSubmit endpoint — where inquiries actually land.
//
// Flow:
//   1. Plain-email form     →  FormSubmit sends a confirmation email the first
//                              time the form is submitted.
//   2. Owner clicks "Confirm" in that email.
//   3. FormSubmit then issues a random hash. Swap this constant to that hash
//      (e.g. 'ab12cd34ef56'), and FormSubmit will still deliver to the same
//      inbox, but the address is no longer in the rendered page source.
//
// Until the hash is issued, the email below ships with the bundle — still
// only visible to anyone who reads the JS, not to casual visitors, but
// swapping to the hash is the real hiding step. The destination inbox never
// changes; only the token in this URL does.
// ---------------------------------------------------------------------------
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/migle.cirtautaite@gmail.com';

// Email validation — permissive enough to accept real addresses, strict
// enough to catch typos like "bad@domain" or "no-at-sign.com".
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values, lang) {
  const errs = {};
  const t = (en, lt) => (lang === 'en' ? en : lt);

  if (!values.name.trim()) {
    errs.name = t('Please enter your name.', 'Įveskite savo vardą.');
  } else if (values.name.trim().length < 2) {
    errs.name = t('Name looks too short.', 'Vardas atrodo per trumpas.');
  }

  if (!values.email.trim()) {
    errs.email = t('Email is required.', 'El. paštas privalomas.');
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errs.email = t('That doesn’t look like a valid email address.', 'Panašu, kad el. pašto adresas neteisingas.');
  }

  if (!values.subject) {
    errs.subject = t('Please pick a subject.', 'Pasirinkite temą.');
  }

  const msg = values.message.trim();
  if (!msg) {
    errs.message = t('Please write a short message.', 'Parašykite trumpą žinutę.');
  } else if (msg.length < 10) {
    errs.message = t('Your message is a bit too short — add a sentence or two.', 'Žinutė per trumpa — pridėkite sakinį ar du.');
  }

  return errs;
}

const EMPTY_VALUES = { name: '', email: '', subject: '', message: '', _honey: '' };

export default function Contact() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function update(field) {
    return (e) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      // Re-run validation on change so errors clear as soon as they're fixed.
      if (touched[field] || errors[field]) {
        const nextErrors = validate(next, lang);
        setErrors(nextErrors);
      }
    };
  }

  function onBlur(field) {
    return () => {
      setTouched({ ...touched, [field]: true });
      setErrors(validate(values, lang));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    // Mark every field as touched so any remaining errors show up.
    setTouched({ name: true, email: true, subject: true, message: true });
    const nextErrors = validate(values, lang);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return; // Stop — fields are invalid.
    }

    // Honeypot trap — bots fill every field; legit users never touch this.
    if (values._honey) {
      setSent(true);
      return;
    }

    setSending(true);
    try {
      const fd = new FormData();
      fd.append('name', values.name.trim());
      fd.append('email', values.email.trim());
      fd.append('subject', values.subject);
      fd.append('message', values.message.trim());
      fd.append('_subject', 'Perkūnas website — new inquiry');
      fd.append('_template', 'table');
      fd.append('_captcha', 'false');

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd
      });
      if (!res.ok) throw new Error('Submit failed');
      setSent(true);
      setValues(EMPTY_VALUES);
      setTouched({});
      setErrors({});
    } catch (err) {
      setSubmitError(lang === 'en' ? 'Could not send message. Try again or email us directly.' : 'Nepavyko išsiųsti žinutės. Pabandyk dar kartą arba parašyk el. paštu.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">REACH OUT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          {lang === 'en' ? 'Contact' : 'Kontaktai'}
        </h1>
        <p className="text-white/60 max-w-2xl">
          {lang === 'en'
            ? 'Questions, partnership, press — drop us a message. We reply within 48 hours.'
            : 'Klausimai, partnerystė, spauda — parašyk. Atsakome per 48 val.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
        {/* Left: channel grid */}
        <div className="space-y-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-brand-400/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand-400 text-[22px]">{c.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="mono-label mb-0.5">{c.label}</div>
                <div className="text-white font-semibold text-sm truncate">{c.value}</div>
              </div>
              <span className="material-symbols-outlined text-white/40 text-[18px]">arrow_outward</span>
            </a>
          ))}
        </div>

        {/* Right: form card */}
        <Card className="glass" shadow="none">
          <CardBody className="p-7 sm:p-9">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-brand-400/15 border border-brand-400/40 flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-brand-400 text-[32px]">check</span>
                </div>
                <div className="mono-tag text-brand-400 mb-2">MESSAGE RECEIVED</div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {lang === 'en' ? 'Thanks — we got it.' : 'Ačiū — gavome.'}
                </h3>
                <p className="text-white/60 mb-6">
                  {lang === 'en' ? 'We reply within 48 hours.' : 'Atsakysime per 48 val.'}
                </p>
                <Button variant="flat" color="primary" onClick={() => setSent(false)}>
                  {lang === 'en' ? 'Send another' : 'Siųsti dar vieną'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FormSubmit config — these names are FormSubmit conventions */}
                <input type="hidden" name="_subject" value="Perkūnas website — new inquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                {/* Honeypot: hidden from users + AT accessibility tree, but
                    bots fill every field they find. */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-10000px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    pointerEvents: 'none'
                  }}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    required
                    isRequired
                    autoComplete="name"
                    variant="bordered"
                    label={lang === 'en' ? 'Full name' : 'Vardas Pavardė'}
                    classNames={{
                      inputWrapper: 'bg-ink-800/60 border-white/10 data-[hover=true]:border-brand-400/40 group-data-[focus=true]:border-brand-400'
                    }}
                  />
                  <Input
                    name="email"
                    type="email"
                    required
                    isRequired
                    autoComplete="email"
                    variant="bordered"
                    label="Email"
                    classNames={{
                      inputWrapper: 'bg-ink-800/60 border-white/10 data-[hover=true]:border-brand-400/40 group-data-[focus=true]:border-brand-400'
                    }}
                  />
                </div>

                <Select
                  name="subject"
                  isRequired
                  variant="bordered"
                  label={lang === 'en' ? 'Subject' : 'Tema'}
                  classNames={{
                    trigger: 'bg-ink-800/60 border-white/10 data-[hover=true]:border-brand-400/40 data-[focus=true]:border-brand-400'
                  }}
                >
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s.key}>{s[lang]}</SelectItem>
                  ))}
                </Select>

                <Textarea
                  name="message"
                  required
                  isRequired
                  variant="bordered"
                  minRows={5}
                  label={lang === 'en' ? 'Message' : 'Žinutė'}
                  classNames={{
                    inputWrapper: 'bg-ink-800/60 border-white/10 data-[hover=true]:border-brand-400/40 group-data-[focus=true]:border-brand-400'
                  }}
                />

                {error && (
                  <div className="glass rounded-lg p-3 border-red-400/40 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="full"
                  className="w-full sm:w-auto font-bold"
                  isLoading={sending}
                  endContent={!sending && <span className="material-symbols-outlined text-[18px]">send</span>}
                >
                  {sending
                    ? lang === 'en' ? 'Sending…' : 'Siunčiama…'
                    : lang === 'en' ? 'Send message' : 'Siųsti žinutę'}
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
