"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@heroui/navbar';
import { NavbarBrand } from '@heroui/navbar';
import { NavbarContent } from '@heroui/navbar';
import { NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { MovingGrid } from '@/components/background/MovingGrid';

import carInSun from '../images/CarInSun.Cl8Zd13v.png';
import gpmImage from '../images/gpm.BFzSzPWq.png';
import competitionImage from '../images/Competition.BN4d3-bK.png';
import logo from '../images/logo.DW5XiSKA.png';

export default function AboutUsPage() {
  return (
    <>
      <MovingGrid />
      
      {/* Navbar */}
      <Navbar
        className="fixed top-0 z-50 bg-[rgba(11,6,5,0.95)] border-b-2 border-[#FA8F31] shadow-lg backdrop-blur-md"
        maxWidth="xl"
      >
        <NavbarBrand>
          <Link href="/">
            <Image
              src={logo}
              alt="Perkūnas RT logotipas"
              height={45}
              className="cursor-pointer drop-shadow-[0_0_4px_#fa8f31] hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-7" justify="center">
          <NavbarItem>
            <Link 
              href="/about-us" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Apie mus
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/team" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Komanda
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/gallery" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Galerija
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/partners" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Rėmėjai
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/join-us" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Prisijunk
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/support-us" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Parama
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/contact" 
              className="text-[#FA8F31] font-bold text-lg tracking-wide px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#FA8F31] hover:to-[#F16D26] hover:text-[#0B0605] hover:shadow-[0_0_15px_rgba(250,143,49,0.6)] transition-all duration-300"
            >
              Kontaktai
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <main className="pt-24 max-w-6xl mx-auto px-5 pb-16 relative z-10">
        
        {/* Apie Perkūnas RT Section */}
        <section className="bg-gradient-to-br from-[rgba(124,23,21,0.3)] to-[rgba(170,24,17,0.2)] border-2 border-[#F16D26] rounded-2xl p-10 mb-10 shadow-[0_4px_15px_rgba(241,109,38,0.3)]">
          <h1 className="text-5xl font-bold text-[#FA8F31] mb-6 text-shadow-[0_0_15px_rgba(241,109,38,0.6)]">
            Apie Perkūnas RT
          </h1>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Perkūnas Racing Team – tai studentų komanda iš Lietuvos, kurianti ir konstruojanti lenktyninį automobilį Formula Student varžyboms. Mūsų tikslas – ne tik pasiekti aukštų rezultatų trasoje, bet ir ugdyti inžinerinius, vadybinius bei kūrybinius įgūdžius.
          </p>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Komandoje susibūrę įvairių sričių studentai: nuo mechanikos, elektronikos, iki dizaino ir verslo. Kiekvienas narys prisideda prie bendro tikslo – sukurti inovatyvų, greitą ir patikimą bolidą.
          </p>
          <div className="flex justify-center">
            <Image
              src={carInSun}
              alt="Komandos automobilis"
              className="w-full max-w-[600px] h-auto rounded-2xl border-2 border-[#F16D26] shadow-[0_0_25px_rgba(241,109,38,0.4)]"
            />
          </div>
        </section>

        {/* Mūsų misija Section */}
        <section className="bg-gradient-to-br from-[rgba(124,23,21,0.3)] to-[rgba(170,24,17,0.2)] border-2 border-[#F16D26] rounded-2xl p-10 mb-10 shadow-[0_4px_15px_rgba(241,109,38,0.3)]">
          <h1 className="text-5xl font-bold text-[#FA8F31] mb-6 text-shadow-[0_0_15px_rgba(241,109,38,0.6)]">
            Mūsų misija
          </h1>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Ugdome ateities lyderius inžinerijos, technologijų ir verslo srityse, kurdami aplinką, kurioje teorinės žinios virsta realiais sprendimais. Kaip suvienyta komanda, mes ne tik kuriame automobilį, bet ir formuojame tvarų mokymosi klimatą.
          </p>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Esame įsipareigoję skatinti augimą, kurti stiprius partnerystes su pramonės specialistais ir stumti studentų motorsporto ribas, prisidėdami prie inovacijų tiek Lietuvoje, tiek tarptautiniu mastu.
          </p>
          <div className="flex justify-center">
            <Image
              src={gpmImage}
              alt="Misijos iliustracija"
              className="w-full max-w-[600px] h-auto rounded-2xl border-2 border-[#F16D26] shadow-[0_0_25px_rgba(241,109,38,0.4)]"
            />
          </div>
        </section>

        {/* Varžybos Section */}
        <section className="bg-gradient-to-br from-[rgba(124,23,21,0.3)] to-[rgba(170,24,17,0.2)] border-2 border-[#F16D26] rounded-2xl p-10 mb-10 shadow-[0_4px_15px_rgba(241,109,38,0.3)]">
          <h1 className="text-5xl font-bold text-[#FA8F31] mb-6 text-shadow-[0_0_15px_rgba(241,109,38,0.6)]">
            Varžybos
          </h1>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Formula Student yra vienas prestižiškiausių inžinerijos konkursų pasaulyje, subūriantis universiteto inžinerijos studentus iš viso pasaulio, siekiančius parodyti savo įgūdžius dizaine, gamyboje, testavime ir projektų vadyboje.
          </p>
          <p className="text-lg font-semibold mb-5 text-white leading-relaxed">
            Varžybose komandos vertinamos ne tik trasoje, bet ir pristatant verslo planą, rinkodaros strategijas, gamybos galimybes ir kaštų analizę. Sėkmė priklauso nuo kūrybiškumo, techninių žinių, inovacijų ir komandinio darbo.
          </p>
          <div className="flex justify-center">
            <Image
              src={competitionImage}
              alt="Varžybų momentas"
              className="w-full max-w-[600px] h-auto rounded-2xl border-2 border-[#F16D26] shadow-[0_0_25px_rgba(241,109,38,0.4)]"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0B0605] to-[#7C1715] py-5 border-t-2 border-[#F16D26] text-white">
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center flex-wrap gap-4">
          <div className="logo">
            <Image
              src={logo}
              alt="Perkūnas"
              height={45}
              className="drop-shadow-[0_0_4px_#fa8f31]"
            />
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/perkunas_racing_ktu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image src={instagramIcon} alt="Instagram" width={28} height={28} className="brightness-75 hover:brightness-100" />
              </a>
              <a 
                href="https://www.linkedin.com/company/perkunasrt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image src={linkedinIcon} alt="LinkedIn" width={28} height={28} className="brightness-75 hover:brightness-100" />
              </a>
              <a 
                href="https://www.tiktok.com/@perknasrt_ktu?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image src={tiktokIcon} alt="TikTok" width={28} height={28} className="brightness-75 hover:brightness-100" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61575797945434" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image src={facebookIcon} alt="Facebook" width={28} height={28} className="brightness-75 hover:brightness-100" />
              </a>
            </div>
            <div className="text-[#FA8F31] font-semibold text-base underline">
              perkunasrt@gmail.com
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
