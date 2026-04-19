"use client";

import { Link, Accordion, AccordionItem } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faMapMarkerAlt,
  faPhoneAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/button";
import AOS from "aos";

import {
  title as titleStyle,
  subtitle as subtitleStyle,
} from "@/components/primitives";
import "aos/dist/aos.css";
import { useFeaturedCardMouseEffect } from "@/lib/featured-card";
import MovingStars from "@/components/ui/moving-stars";
import { Heading } from "@/components/common/heading";

const contactMethods = [
  {
    icon: faComments,
    title: "Chat with us",
    description: "Speak to our team.",
    link: "mailto:thunderclaplabs@gmail.com",
    linkText: "thunderclaplabs@gmail.com",
  },
  {
    icon: faMapMarkerAlt,
    title: "Visit us",
    description: "Studentų g. 65, Kaunas, Lithuania",
    link: "https://www.google.com/maps/place/Student%C5%B3+g.+65,+Kaunas,+51369+Kauno+m.+sav./@54.9039583,23.9568993,609m/data=!3m2!1e3!4b1!4m6!3m5!1s0x46e7186332d1fd0d:0xf3e05e748e2ef3f3!8m2!3d54.9039583!4d23.9594796!16s%2Fg%2F11bw40l_h6?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D", // Placeholder link
    linkText: "View on Google Maps",
  },
  {
    icon: faPhoneAlt,
    title: "Call us",
    description: "Always open for a chat.",
    link: "tel:+37062480682",
    linkText: "+370 624 80 682",
  },
];

const faqItems = [
  {
    key: "1",
    title: "Are you an official business?",
    content:
      "We are a dedicated team of students, primarily from Kaunas University of Technology in Lithuania. While we are not yet a registered business entity, we are actively seeking initial funding to establish one and transition into a formal organization.",
  },
  {
    key: "2",
    title: "Are you incubated by KTU?",
    content:
      "Yes, we are currently incubated by the Kaunas University of Technology Startup Space, which provides us with workspace, mentorship, and institutional support as we develop our venture.",
  },
  {
    key: "3",
    title: "Are you looking for new team members?",
    content:
      "Yes, we are always looking for passionate and talented individuals to join our team. Our recruitment process is highly selective — we strive to bring in only the most driven and capable people. If you're interested in joining us, please reach out through our social media channels.",
  },
  {
    key: "4",
    title: "Can I visit your office?",
    content:
      "Yes, you can visit our office at Studentų g. 65, Kaunas, Lithuania. However, you should contact us beforehand to ensure someone is available to meet with you.",
  },
  {
    key: "5",
    title:
      "What are the companies and organisations listed on the landing page?",
    content:
      "The companies and organizations featured on our landing page are valued partners, collaborators, and supporters. We work closely with them to deliver innovative solutions and mutual value. If you're interested in exploring a partnership, feel free to reach out through our official channels.",
  },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/perkunas_racing_ktu/",
    src: "/images/instagram.VUFQ3l_n.png",
    alt: "Instagram logo",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/perkunasrt/",
    src: "/images/linkedin.DgLzhU7_.png",
    alt: "LinkedIn logo",
    label: "LinkedIn",
  },
  {
    href: "https://www.tiktok.com/@perknasrt_ktu",
    src: "/images/tiktok.DhATMZaU.png",
    alt: "TikTok logo",
    label: "TikTok",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61575797945434",
    src: "/images/facebook.DFt5a5XP.png",
    alt: "Facebook logo",
    label: "Facebook",
  },
];

export default function ContactPage() {
  const cardGridRef = useRef<HTMLDivElement>(null);
  useFeaturedCardMouseEffect();
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="relative min-h-screen text-foreground" style={{background: 'linear-gradient(135deg, #0B0605, #1a1a1a)', backgroundImage: 'linear-gradient(rgba(250, 143, 49, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(170, 24, 17, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
      <MovingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Heading subtitle="Susisiekite su Perkūnas RT komanda" title="Kontaktai" />
        <div
          ref={cardGridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          id="contact-card-grid"
        >
          {/* Contact Form Card */}
          <section className="bg-[#181818] border-2 border-yellow-400 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Susisiekite su mumis</h2>
            <form className="flex flex-col gap-4" action="https://formsubmit.co/perkunasrt@gmail.com" method="POST" noValidate>
              <label htmlFor="name" className="font-semibold text-yellow-400">Vardas, pavardė</label>
              <input type="text" name="name" id="name" required className="rounded-lg border border-gray-300 px-4 py-2" placeholder="Jūsų vardas ir pavardė" />
              <label htmlFor="email" className="font-semibold text-yellow-400">El. paštas</label>
              <input type="email" name="email" id="email" required className="rounded-lg border border-gray-300 px-4 py-2" placeholder="jusu.email@pavyzdys.com" />
              <label htmlFor="subject" className="font-semibold text-yellow-400">Tema</label>
              <select name="subject" id="subject" required className="rounded-lg border border-gray-300 px-4 py-2">
                <option value="" disabled>Pasirinkite temą</option>
                <option value="partnership">Partnerystė</option>
                <option value="membership">Narystė komandoje</option>
                <option value="sponsorship">Rėmimas</option>
                <option value="other">Kita</option>
              </select>
              <label htmlFor="message" className="font-semibold text-yellow-400">Žinutė</label>
              <textarea name="message" id="message" rows={5} required className="rounded-lg border border-gray-300 px-4 py-2" placeholder="Parašykite savo žinutę..." />
              <button type="submit" className="bg-yellow-400 text-black font-bold py-3 rounded-lg mt-2 hover:bg-yellow-300 transition">Siųsti žinutę</button>
            </form>
          </section>
          {/* Contact Info Card */}
          <aside className="bg-[#181818] border-2 border-yellow-400 rounded-xl p-8 shadow-xl flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Kontaktinė informacija</h2>
            <div className="mb-4">
              <p className="font-semibold text-white mb-2">
                <strong>El. paštas:</strong><br/>
                <a href="mailto:perkunasrt@gmail.com" className="text-yellow-400">perkunasrt@gmail.com</a>
              </p>
              <p className="font-semibold text-white mb-2">
                <strong>Vadovų kontaktai:</strong><br/>
                <a href="mailto:benluk2@ktu.lt" className="text-yellow-400">benluk2@ktu.lt</a><br/>
                <a href="mailto:deimic@ktu.lt" className="text-yellow-400">deimic@ktu.lt</a>
              </p>
              <p className="font-semibold text-white mb-4">
                <strong>Adresas:</strong><br/>
                Studentų g. 65, Kaunas, Lietuva
              </p>
            </div>
            <div className="mb-4">
              <p className="text-center font-semibold text-gray-300 mb-2">Socialiniai tinklai:</p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener" aria-label={link.label} className="rounded-full border-2 border-yellow-400 p-2 bg-white hover:bg-yellow-100 transition">
                    <img src={link.src} alt={link.alt} className="w-8 h-8" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className={titleStyle({ class: "text-3xl sm:text-4xl text-yellow-400" })}>Frequently asked questions</h2>
          </div>
          <div data-aos="fade-up">
            <Accordion className="text-foreground bg-[#181818] border-2 border-yellow-400 backdrop-blur-sm shadow-xl" selectionMode="multiple" variant="bordered">
              {faqItems.map((item) => (
                <AccordionItem key={item.key} aria-label={item.title} title={<span className="text-yellow-400">{item.title}</span>}>
                  <span className="text-sm text-white">{item.content}</span>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-16 py-8 border-t-2 border-yellow-400 flex flex-col items-center">
          <img src="/images/logo.DW5XiSKA.png" alt="Perkūnas logo" className="h-12 mb-2" />
          <div className="flex gap-6 mb-2">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener" aria-label={link.label} className="rounded-full border-2 border-yellow-400 p-2 bg-white hover:bg-yellow-100 transition">
                <img src={link.src} alt={link.alt} className="w-7 h-7" />
              </a>
            ))}
          </div>
          <a href="mailto:perkunasrt@gmail.com" className="text-yellow-400 font-bold">perkunasrt@gmail.com</a>
        </footer>
      </div>
    </div>
  );
}
