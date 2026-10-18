import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1e2229] py-10 px-6 md:px-12 lg:px-[72px] text-white border-t border-[#343a40]/40">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Company Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Link href="/" className="inline-block shrink-0" aria-label="SP10 Construction Home">
              <div className="w-[144px] h-[72px] relative flex items-center">
                <Image
                  src="/logo-white.png"
                  alt="SP10 Construction LLC"
                  width={144}
                  height={72}
                  className="object-contain max-h-[72px] w-auto"
                />
              </div>
            </Link>
            <p className="font-sans text-[16px] leading-[26.4px] text-[#bfc5ce] max-w-[540px]">
              Commercial general contracting. Custom residential construction. Serving
              Houston, Austin and surrounding Texas regions. Built with precision, from the first
              plan to the final detail.
            </p>
          </div>

          {/* Quick Links Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-12">
            <p className="font-sans font-bold text-[11px] leading-[13px] text-[#bfc5ce] uppercase tracking-wider">
              EXPLORE SP10
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {/* Services Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/services"
                  className="font-oswald text-[24px] leading-[36px] uppercase text-white hover:text-[#bfc5ce] transition-colors"
                >
                  Services
                </Link>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/services#commercial"
                    className="font-sans text-[13px] leading-[16px] text-[#bfc5ce] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Commercial</span>
                    <ArrowUpRight className="w-3 h-3 text-[#bfc5ce]" />
                  </Link>
                  <Link
                    href="/services#residential"
                    className="font-sans text-[13px] leading-[16px] text-[#bfc5ce] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Residential</span>
                    <ArrowUpRight className="w-3 h-3 text-[#bfc5ce]" />
                  </Link>
                </div>
              </div>

              {/* Projects Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/projects"
                  className="font-oswald text-[24px] leading-[36px] uppercase text-white hover:text-[#bfc5ce] transition-colors"
                >
                  Projects
                </Link>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/projects?filter=commercial"
                    className="font-sans text-[13px] leading-[16px] text-[#bfc5ce] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Commercial</span>
                    <ArrowUpRight className="w-3 h-3 text-[#bfc5ce]" />
                  </Link>
                  <Link
                    href="/projects?filter=residential"
                    className="font-sans text-[13px] leading-[16px] text-[#bfc5ce] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Residential</span>
                    <ArrowUpRight className="w-3 h-3 text-[#bfc5ce]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Links & Details */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#bfc5ce]">
              <Link
                href="/contact"
                className="font-sans font-semibold text-[14px] leading-[17px] text-white hover:text-[#bfc5ce] transition-colors inline-flex items-center gap-1"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </Link>
              <span className="text-[#454b54] hidden sm:inline">|</span>
              <a
                href="tel:+18327752022"
                className="font-sans text-[13px] text-[#bfc5ce] hover:text-white transition-colors"
              >
                +1 (832) 775-2022
              </a>
              <span className="text-[#454b54] hidden sm:inline">|</span>
              <a
                href="mailto:info@sp10construction.com"
                className="font-sans text-[13px] text-[#bfc5ce] hover:text-white transition-colors"
              >
                info@sp10construction.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider Rule */}
        <div className="w-full h-[1px] bg-[#454b54] my-2" />

        {/* Legal Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-[11px] text-[#bfc5ce]">
          <p>© 2026 SP10 Construction LLC. All rights reserved.</p>
          <p className="leading-[18px]">
            <a
              href="https://indevasa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Indeva Websites
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
