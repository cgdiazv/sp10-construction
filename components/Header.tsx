"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";

interface HeaderProps {
  currentPage?: "home" | "services" | "projects" | "contact";
}

export default function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { label: "Services", href: "/services", id: "services" },
    { label: "Projects", href: "/projects", id: "projects" },
    { label: "Contact", href: "/contact", id: "contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-[#e8ebef]/60 relative z-40">
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-[1440px] mx-auto h-[112px] px-6 md:px-12 lg:px-[72px]">
        {/* Supplied SP10 Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="SP10 Construction Home">
          <div className="w-[144px] h-[108px] relative flex items-center justify-center">
            <Image
              src="/images/sp10-logo.png"
              alt="SP10 Construction LLC Logo"
              width={144}
              height={108}
              className="object-contain max-h-[96px] w-auto"
              priority
            />
          </div>
        </Link>

        {/* Centered Navigation */}
        <nav aria-label="Primary navigation" className="flex items-center">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id} className="group">
                  <Link
                    href={item.href}
                    className="flex flex-col items-center gap-1.5 pt-1"
                  >
                    <span
                      className={`font-sans font-medium text-[14px] leading-[17px] tracking-normal transition-colors ${
                        isActive ? "text-[#0f172a] font-semibold" : "text-[#0f172a] group-hover:text-[#8b4513]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`h-[2px] w-full transition-all duration-200 ${
                        isActive ? "bg-[#8b4513]" : "bg-transparent group-hover:bg-[#8b4513]/40"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Direct Actions */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2.5">
              <a
                href="tel:+18327752022"
                className="font-sans font-semibold text-[13px] leading-[16px] text-[#0f172a] hover:text-[#8b4513] transition-colors"
              >
                +1 (832) 775-2022
              </a>
              <span className="text-[#cbd5e1] text-xs">|</span>
              <a
                href="tel:+12146176537"
                className="font-sans font-semibold text-[13px] leading-[16px] text-[#0f172a] hover:text-[#8b4513] transition-colors"
              >
                +1 (214) 617-6537
              </a>
            </div>
            <span className="font-sans text-[10px] font-medium tracking-wide uppercase text-[#64748b]">
              English &amp; Spanish Spoken
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
          >
            <span>Request an Estimate</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full px-6 pt-1 pb-5 flex flex-col gap-3">
        {/* Brand and Phone */}
        <div className="flex items-center justify-between gap-2">
          <Link href="/" aria-label="SP10 Construction Home">
            <div className="w-[112px] h-[84px] relative flex items-center">
              <Image
                src="/images/sp10-logo.png"
                alt="SP10 Construction LLC Logo"
                width={112}
                height={84}
                className="object-contain max-h-[72px] w-auto"
                priority
              />
            </div>
          </Link>
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="flex flex-col xs:flex-row items-end xs:items-center gap-0.5 xs:gap-2">
              <a
                href="tel:+18327752022"
                className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a] hover:text-[#8b4513] transition-colors"
              >
                +1 (832) 775-2022
              </a>
              <span className="text-[#cbd5e1] text-xs hidden xs:inline">|</span>
              <a
                href="tel:+12146176537"
                className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a] hover:text-[#8b4513] transition-colors"
              >
                +1 (214) 617-6537
              </a>
            </div>
            <span className="font-sans text-[9px] font-medium tracking-wide uppercase text-[#64748b]">
              English &amp; Spanish Spoken
            </span>
          </div>
        </div>

        {/* Navigation Row */}
        <nav aria-label="Mobile navigation" className="flex items-center justify-start">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id} className="group">
                  <Link
                    href={item.href}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={`font-sans font-medium text-[14px] leading-[17px] ${
                        isActive ? "text-[#0f172a] font-semibold" : "text-[#0f172a]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`h-[2px] w-full ${
                        isActive ? "bg-[#8b4513]" : "bg-transparent"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Full-width CTA button */}
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-4 transition-colors rounded-none font-sans font-semibold text-[12px] leading-[15px]"
        >
          <span>Request an Estimate</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
