import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QualityStrip from "@/components/QualityStrip";
import EstimateForm from "@/components/EstimateForm";
import { ArrowUpRight, CheckIcon, ArrowDownIcon } from "@/components/Icons";

export default function Home() {
  const commercialChecklist = [
    "Retail build-outs",
    "Tenant improvements",
    "Industrial facilities",
    "Office renovations",
    "Structural concrete/steel",
  ];

  const residentialChecklist = [
    "Custom home builds",
    "Structural additions",
    "Major interior/exterior remodeling",
    "Framing",
    "Architectural concrete",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
      {/* Header */}
      <Header currentPage="home" />

      <main className="flex-1 w-full">
        {/* Section 1: Home Hero */}
        <section aria-label="Hero" className="w-full bg-[#1e2229] pt-16 sm:pt-20 lg:pt-[88px] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px] flex flex-col gap-10">
            {/* Top Headline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-white">
                    SP10 CONSTRUCTION LLC / GENERAL CONTRACTING
                  </span>
                </div>
                <h1 className="font-oswald font-semibold text-[44px] sm:text-[64px] lg:text-[82px] leading-[1.05] uppercase tracking-tight text-white">
                  BUILT WITH PRECISION.
                  <br />
                  ENGINEERED TO LAST.
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2 pb-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#bfc5ce]">
                  Comprehensive commercial general contracting and custom residential construction services.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#bfc5ce] pt-1">
                  TWO DIVISIONS. ONE UNCOMPROMISING STANDARD.
                </p>
              </div>
            </div>

            {/* Equal Division Hero Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-4">
              {/* Commercial Hero Card */}
              <div className="relative group overflow-hidden bg-black/40 h-[380px] lg:h-[428px] border border-white/10 flex flex-col justify-between p-6 sm:p-8">
                <Image
                  src="/images/hero-commercial.png"
                  alt="Commercial steel beam construction structure"
                  fill
                  priority
                  className="object-cover -z-10 group-hover:scale-105 transition-transform duration-700 brightness-[0.78]"
                />
                <div className="flex items-center justify-between text-white font-sans text-[12px] font-semibold tracking-wider uppercase">
                  <span>COMMERCIAL</span>
                  <span>01 /</span>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <h2 className="font-oswald font-medium text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.1] uppercase text-white">
                    BUILT FOR THE WAY YOU WORK.
                  </h2>
                  <Link
                    href="/services#commercial"
                    className="inline-flex items-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>Explore Commercial</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Residential Hero Card */}
              <div className="relative group overflow-hidden bg-black/40 h-[380px] lg:h-[428px] border border-white/10 flex flex-col justify-between p-6 sm:p-8">
                <Image
                  src="/images/hero-residential.png"
                  alt="Modern architectural custom luxury home"
                  fill
                  priority
                  className="object-cover -z-10 group-hover:scale-105 transition-transform duration-700 brightness-[0.78]"
                />
                <div className="flex items-center justify-between text-white font-sans text-[12px] font-semibold tracking-wider uppercase">
                  <span>RESIDENTIAL</span>
                  <span>02 /</span>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <h2 className="font-oswald font-medium text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.1] uppercase text-white">
                    MADE FOR THE WAY YOU LIVE.
                  </h2>
                  <Link
                    href="/services#residential"
                    className="inline-flex items-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>Explore Residential</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between py-6 border-t border-white/10 font-sans text-[11px] tracking-wider uppercase text-[#bfc5ce]">
              <span>COMMERCIAL + RESIDENTIAL</span>
              <a href="#expertise" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                <span>EXPLORE</span>
                <ArrowDownIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Services Overview */}
        <section id="expertise" className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
            {/* Section Heading Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                    OUR EXPERTISE
                  </span>
                </div>
                <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                  COMMERCIAL STRENGTH.
                  <br />
                  RESIDENTIAL DETAIL.
                </h2>
              </div>
              <div className="lg:col-span-5 pb-1">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#5e6671]">
                  Two dedicated paths, equally focused on quality. From places of business to places called home, SP10 brings a disciplined approach to every scope.
                </p>
              </div>
            </div>

            {/* Two Division Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Commercial Card */}
              <div className="border border-[#d4d8de] bg-white flex flex-col">
                <div className="relative w-full h-[260px] sm:h-[292px] overflow-hidden bg-zinc-100">
                  <Image
                    src="/images/division-commercial.png"
                    alt="SP10 Commercial Construction Architecture"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-oswald font-semibold text-[32px] sm:text-[36px] leading-[44px] sm:leading-[53px] uppercase text-[#0f172a]">
                        COMMERCIAL
                      </h3>
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                        <Image
                          src="/icons/division-commercial.svg"
                          alt=""
                          width={44}
                          height={44}
                          className="w-11 h-11 object-contain"
                        />
                      </div>
                    </div>
                    <p className="font-sans text-[14px] leading-[22px] text-[#5e6671]">
                      Practical spaces. Structural confidence. Construction aligned with your business.
                    </p>
                    <ul className="flex flex-col border-t border-[#e8ebef] pt-2">
                      {commercialChecklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 py-2.5 border-b border-[#e8ebef]/70 font-sans text-[13px] text-[#0f172a]"
                        >
                          <CheckIcon className="w-3.5 h-3.5 text-[#b8860b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/services#commercial"
                    className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>View Commercial Services</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Residential Card */}
              <div className="border border-[#d4d8de] bg-white flex flex-col">
                <div className="relative w-full h-[260px] sm:h-[292px] overflow-hidden bg-zinc-100">
                  <Image
                    src="/images/division-residential.png"
                    alt="SP10 Residential Custom Construction Architecture"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-oswald font-semibold text-[32px] sm:text-[36px] leading-[44px] sm:leading-[53px] uppercase text-[#0f172a]">
                        RESIDENTIAL
                      </h3>
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                        <Image
                          src="/icons/division-residential.svg"
                          alt=""
                          width={44}
                          height={44}
                          className="w-11 h-11 object-contain"
                        />
                      </div>
                    </div>
                    <p className="font-sans text-[14px] leading-[22px] text-[#5e6671]">
                      Thoughtful homes. Lasting craftsmanship. Construction shaped around the way you live.
                    </p>
                    <ul className="flex flex-col border-t border-[#e8ebef] pt-2">
                      {residentialChecklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 py-2.5 border-b border-[#e8ebef]/70 font-sans text-[13px] text-[#0f172a]"
                        >
                          <CheckIcon className="w-3.5 h-3.5 text-[#b8860b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/services#residential"
                    className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>View Residential Services</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects Preview */}
        <section className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px] border-t border-[#e8ebef]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
            {/* Heading Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                    SELECTED POSSIBILITIES
                  </span>
                </div>
                <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                  SPACES WITH PURPOSE.
                  <br />
                  DETAILS THAT ENDURE.
                </h2>
              </div>
              <div className="lg:col-span-5 pb-1 flex flex-col gap-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#5e6671]">
                  Commercial ambition and residential vision, equally represented. These illustrative concepts show potential scopes, not completed SP10 projects.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#8b4513]">
                  ILLUSTRATIVE GALLERY / APPROVED PROJECT CONTENT PENDING
                </p>
              </div>
            </div>

            {/* 2 Track Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Commercial Track */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between pb-2 border-b border-[#0f172a]">
                  <h3 className="font-oswald font-medium text-[24px] uppercase text-[#0f172a]">
                    COMMERCIAL
                  </h3>
                  <span className="font-sans text-[12px] font-semibold text-[#5e6671] uppercase">
                    02 CONCEPTS
                  </span>
                </div>

                {/* Card 1: Office Build-out */}
                <div className="flex flex-col border border-[#d4d8de] bg-white">
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-zinc-100">
                    <Image
                      src="/images/project-office-buildout.png"
                      alt="Office build-out tenant improvements"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                      <span className="border border-[#8b4513] text-[#8b4513] px-2 py-0.5 font-sans">
                        COMMERCIAL
                      </span>
                      <span className="text-[#5e6671] font-sans">Location pending</span>
                    </div>
                    <h4 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[38px] uppercase text-[#0f172a] pt-1">
                      OFFICE BUILD-OUT
                    </h4>
                    <p className="font-sans text-[12px] text-[#5e6671] uppercase tracking-wider">
                      TENANT IMPROVEMENTS / INTERIORS
                    </p>
                  </div>
                </div>

                {/* Card 2: Commercial Storefront */}
                <div className="flex flex-col border border-[#d4d8de] bg-white">
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-zinc-100">
                    <Image
                      src="/images/project-commercial-storefront.png"
                      alt="Commercial storefront retail build-out"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                      <span className="border border-[#8b4513] text-[#8b4513] px-2 py-0.5 font-sans">
                        COMMERCIAL
                      </span>
                      <span className="text-[#5e6671] font-sans">Location pending</span>
                    </div>
                    <h4 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[38px] uppercase text-[#0f172a] pt-1">
                      COMMERCIAL STOREFRONT
                    </h4>
                    <p className="font-sans text-[12px] text-[#5e6671] uppercase tracking-wider">
                      RETAIL BUILD-OUT / STOREFRONT
                    </p>
                  </div>
                </div>
              </div>

              {/* Residential Track */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between pb-2 border-b border-[#0f172a]">
                  <h3 className="font-oswald font-medium text-[24px] uppercase text-[#0f172a]">
                    RESIDENTIAL
                  </h3>
                  <span className="font-sans text-[12px] font-semibold text-[#5e6671] uppercase">
                    02 CONCEPTS
                  </span>
                </div>

                {/* Card 3: Custom Modern Home */}
                <div className="flex flex-col border border-[#d4d8de] bg-white">
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-zinc-100">
                    <Image
                      src="/images/project-custom-modern-home.png"
                      alt="Custom modern home structural framing"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                      <span className="border border-[#8b4513] text-[#8b4513] px-2 py-0.5 font-sans">
                        RESIDENTIAL
                      </span>
                      <span className="text-[#5e6671] font-sans">Location pending</span>
                    </div>
                    <h4 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[38px] uppercase text-[#0f172a] pt-1">
                      CUSTOM MODERN HOME
                    </h4>
                    <p className="font-sans text-[12px] text-[#5e6671] uppercase tracking-wider">
                      CUSTOM HOME / STRUCTURAL FRAMING
                    </p>
                  </div>
                </div>

                {/* Card 4: Luxury Addition */}
                <div className="flex flex-col border border-[#d4d8de] bg-white">
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-zinc-100">
                    <Image
                      src="/images/project-luxury-addition.png"
                      alt="Luxury residential structural addition and concrete"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                      <span className="border border-[#8b4513] text-[#8b4513] px-2 py-0.5 font-sans">
                        RESIDENTIAL
                      </span>
                      <span className="text-[#5e6671] font-sans">Location pending</span>
                    </div>
                    <h4 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[38px] uppercase text-[#0f172a] pt-1">
                      LUXURY ADDITION
                    </h4>
                    <p className="font-sans text-[12px] text-[#5e6671] uppercase tracking-wider">
                      STRUCTURAL ADDITION / CONCRETE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="flex items-center justify-center pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-[18px] border border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white py-4 px-8 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Quality Commitment Strip */}
        <QualityStrip />

        {/* Section 5: Client Perspectives */}
        <section className="w-full bg-[#f4f5f7] py-20 lg:py-24 px-6 md:px-12 lg:px-[72px]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
            {/* Section Tag & Heading */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                  CLIENT PERSPECTIVES
                </span>
              </div>
              <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                BUILT ON CLEAR EXPECTATIONS.
              </h2>
            </div>

            {/* 2 Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Card 1 */}
              <div className="bg-white border-t-2 border-t-[#8b4513] p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-xs">
                <div className="flex flex-col gap-4">
                  <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#8b4513]">
                    ILLUSTRATIVE SAMPLE / CLIENT TEXT PENDING
                  </span>
                  <blockquote className="font-oswald font-normal text-[24px] sm:text-[30px] leading-[34px] sm:leading-[40px] text-[#0f172a]">
                    &ldquo;A clear plan, coordinated trades and attention to the details our business depends on.&rdquo;
                  </blockquote>
                </div>
                <div className="flex flex-col gap-1 border-t border-[#e8ebef] pt-4">
                  <p className="font-sans font-semibold text-[14px] text-[#0f172a]">
                    Commercial facility manager
                  </p>
                  <p className="font-sans text-[12px] text-[#5e6671]">
                    Awaiting approved client quote and attribution.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border-t-2 border-t-[#8b4513] p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-xs">
                <div className="flex flex-col gap-4">
                  <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#8b4513]">
                    ILLUSTRATIVE SAMPLE / CLIENT TEXT PENDING
                  </span>
                  <blockquote className="font-oswald font-normal text-[24px] sm:text-[30px] leading-[34px] sm:leading-[40px] text-[#0f172a]">
                    &ldquo;A thoughtful approach, clear communication and care for the details that make a house our home.&rdquo;
                  </blockquote>
                </div>
                <div className="flex flex-col gap-1 border-t border-[#e8ebef] pt-4">
                  <p className="font-sans font-semibold text-[14px] text-[#0f172a]">
                    Residential property owner
                  </p>
                  <p className="font-sans text-[12px] text-[#5e6671]">
                    Awaiting approved client quote and attribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Request an Estimate Form */}
        <EstimateForm
          sectionTag="BUILD WITH SP10"
          heading={"YOUR NEXT PROJECT.\nSTARTS HERE."}
          subheading="Commercial or Residential, every project begins with a clear conversation. Share your priorities, tell us where you're building and include any plans you have."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
