"use client";

import React from 'react';
import Image from 'next/image';
import { MovingGrid } from '../components/background/MovingGrid';

// Particles component for background
const MovingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `float-up ${Math.random() * 20 + 10}s linear infinite ${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating larger particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-400/20 to-red-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite ${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function JoinUsPage() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0B0605, #1a1a1a)',
      backgroundImage: `
        linear-gradient(rgba(250, 143, 49, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(170, 24, 17, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    }}>
      <MovingGrid />
      <MovingParticles />
      
      {/* Main content */}
      <main className="relative z-10 pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Join section */}
            <article className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border-2 border-orange-500 rounded-xl p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:border-orange-400 transition-all duration-300">
              <h1 className="text-4xl font-bold text-orange-400 mb-6 text-shadow-lg">
                Nori prisijungti?
              </h1>
              <p className="text-lg text-white mb-6 leading-relaxed">
                Norėdami prisijungti, spustelėkite žemiau esantį mygtuką ir užpildykite formą. Naujų narių ieškome rugsėjo ir vasario mėnesiais, tačiau jei turite patirties inžinerijoje, versle ar net Formula Student varžybose – tai įvertinsime.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdwLiYJsdeDij5YE5FDXWvOn8sIecHKf9AITatkuBPsYKg6zQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                PRISIJUNGTI
              </a>
            </article>

            {/* Benefits section */}
            <article className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border-2 border-orange-500 rounded-xl p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:border-orange-400 transition-all duration-300">
              <h1 className="text-4xl font-bold text-orange-400 mb-6 text-shadow-lg">
                Ką laimėsi prisijungdamas?
              </h1>
              <ul className="space-y-4 text-white">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 text-xl">•</span>
                  <span className="text-lg">Įgysi praktinės patirties kuriant, projektavant ir testuojant aukštos kokybės transporto priemonę.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 text-xl">•</span>
                  <span className="text-lg">Dirbdamas su rėmėjais ir atstovaujant komandai, mokysies verslo, rinkodaros ir projektų valdymo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 text-xl">•</span>
                  <span className="text-lg">Plėtosi komandinio darbo, lyderystės ir laiko valdymo įgūdžius bendradarbiaujant.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 text-xl">•</span>
                  <span className="text-lg">Užmegzsi ryšius su universiteto dėstytojais ir pramonės partneriais, plėsdamas profesionalų tinklą.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3 text-xl">•</span>
                  <span className="text-lg">Įgysi vertingų žinių ir įgūdžių, kurie padės pasiruošti būsimiems inžinerijos ir verslo iššūkiams.</span>
                </li>
              </ul>
            </article>
          </div>

          {/* Team image */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <Image
                src="/images/Team.CC8i-R1_.png"
                alt="Perkūnas Racing Team komanda"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl border-2 border-orange-500/50"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900 to-red-900 border-t-2 border-orange-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Image src="/images/logo.DW5XiSKA.png" alt="Perkūnas" width={60} height={60} className="filter drop-shadow-lg" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a href="https://www.instagram.com/perkunas_racing_ktu/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/images/instagram.CsCcNGYk.png" alt="Instagram" width={28} height={28} />
                </a>
                <a href="https://www.linkedin.com/company/perkunasrt/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/images/linkedin.DSVuZdlt.png" alt="LinkedIn" width={28} height={28} />
                </a>
                <a href="https://www.tiktok.com/@perknasrt_ktu" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/images/tiktok.CtOAf05B.png" alt="TikTok" width={28} height={28} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575797945434" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/images/facebook.Xxxe5tGu.png" alt="Facebook" width={28} height={28} />
                </a>
              </div>
              <a href="mailto:perkunasrt@gmail.com" className="text-orange-400 font-semibold text-lg underline hover:text-orange-300 transition-colors">
                perkunasrt@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}