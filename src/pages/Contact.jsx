import { useState } from 'react';
import { Input, Textarea, Select, SelectItem, Button, Card, CardBody } from '@heroui/react';
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

export default function Contact() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formsubmit.co/ajax/perkunasrt@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd
      });
      if (!res.ok) throw new Error('Submit failed');
      setSent(true);
      e.target.reset();
    } catch (err) {
      setError(lang === 'en' ? 'Could not send message. Try again or email us directly.' : 'Nepavyko išsiųsti žinutės. Pabandyk dar kartą arba parašyk el. paštu.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand-400" />
          <span className="mono-tag text-brand-400">REACH OUT</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
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
                <input type="hidden" name="_subject" value="Perkūnas website contact" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    required
                    isRequired
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
