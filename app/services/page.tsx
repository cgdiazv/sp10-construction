import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QualityStrip from "@/components/QualityStrip";
import { ArrowUpRight, CheckIcon } from "@/components/Icons";

export default function ServicesPage() {
  const commercialScopes = [
    {
      title: "Retail build-outs",
      desc: "Customer-facing spaces with coordinated interiors, fixtures and finish details.",
    },
    {
      title: "Tenant improvements",
      desc: "Adapt existing space to your operational needs, layout and specifications.",
    },
    {
      title: "Industrial facilities",
      desc: "Plan and build functional environments for equipment, teams and operations.",
    },
    {
      title: "Office renovations",
      desc: "Reconfigure workspaces with coordinated phasing, systems and interior finishes.",
    },
    {
      title: "Structural concrete/steel",
      desc: "Coordinate foundations, structural assemblies and durable building systems.",
    },
  ];

  const residentialScopes = [
    {
      title: "Custom home builds",
      desc: "Bring a complete home together, from foundation and structure to final finishes.",
    },
    {
      title: "Structural additions",
      desc: "Expand living space with carefully integrated structure and architectural details.",
    },
    {
      title: "Major interior/exterior remodeling",
      desc: "Reimagine existing spaces with coordinated materials, systems and finishes.",
    },
    {
      title: "Framing",
      desc: "Build a precise structural framework for new homes, additions and remodels.",
    },
    {
      title: "Architectural concrete",
      desc: "Create refined foundations, terraces and formed concrete features.",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "DEFINE",
      desc: "Discuss your goals, existing conditions, drawings and priorities. Establish a clear starting scope.",
    },
    {
      num: "02",
      title: "PLAN",
      desc: "Review specifications, coordinate trades and align the proposed budget and schedule.",
    },
    {
      num: "03",
      title: "BUILD",
      desc: "Coordinate site activity, track the agreed scope and communicate through construction.",
    },
    {
      num: "04",
      title: "DELIVER",
      desc: "Review the details together, address the punch list and organize project closeout.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
      {/* Header */}
      <Header currentPage="services" />

      <main className="flex-1 w-full">
        {/* Page Hero: Services Introduction */}
        <section aria-label="Services Intro" className="w-full bg-[#1e2229] py-16 sm:py-20 lg:py-[88px] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-white">
                    OUR EXPERTISE
                  </span>
                </div>
                <h1 className="font-oswald font-semibold text-[44px] sm:text-[64px] lg:text-[82px] leading-[1.05] uppercase tracking-tight text-white">
                  TWO DIVISIONS.
                  <br />
                  ONE STANDARD.
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2 pb-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#bfc5ce]">
                  From commercial build-outs to custom homes, our approach connects structural discipline with carefully considered spaces.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#bfc5ce] pt-1">
                  COMMERCIAL / RESIDENTIAL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Expanded Divisions */}
        <section className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
            {/* Heading Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                    SCOPE & CAPABILITIES
                  </span>
                </div>
                <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                  THE RIGHT EXPERTISE.
                  <br />
                  FOR YOUR NEXT BUILD.
                </h2>
              </div>
              <div className="lg:col-span-5 pb-1">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#5e6671]">
                  Each division brings the same commitment to scope clarity, coordinated execution and the details that make a building work. Explore the services and deliverables for your project.
                </p>
              </div>
            </div>

            {/* 2 Detailed Division Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Commercial Card */}
              <div id="commercial" className="border border-[#d4d8de] bg-white flex flex-col scroll-mt-24">
                <div className="relative w-full h-[260px] sm:h-[292px] overflow-hidden bg-zinc-100">
                  <Image
                    src="/images/division-commercial.png"
                    alt="SP10 Commercial Construction Services"
                    fill
                    className="object-cover"
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

                    {/* Detailed Scopes */}
                    <div className="flex flex-col border-t border-[#e8ebef] pt-2">
                      {commercialScopes.map((scope) => (
                        <div
                          key={scope.title}
                          className="flex flex-col py-3 border-b border-[#e8ebef]/70 gap-0.5"
                        >
                          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-[#0f172a]">
                            <CheckIcon className="w-3.5 h-3.5 text-[#b8860b]" />
                            <span>{scope.title}</span>
                          </div>
                          <p className="font-sans text-[12px] leading-[18px] text-[#5e6671] pl-5">
                            {scope.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Planning to Handover */}
                    <div className="flex flex-col gap-1.5 pt-4">
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#8b4513]">
                        FROM PLANNING TO HANDOVER
                      </span>
                      <p className="font-sans text-[12px] leading-[18px] text-[#5e6671]">
                        Scope definition • Trade coordination • Site logistics
                      </p>
                      <p className="font-sans text-[12px] leading-[18px] text-[#5e6671]">
                        Punch-list review • Closeout documentation • Final walkthrough
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>Request a Commercial Estimate</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Residential Card */}
              <div id="residential" className="border border-[#d4d8de] bg-white flex flex-col scroll-mt-24">
                <div className="relative w-full h-[260px] sm:h-[292px] overflow-hidden bg-zinc-100">
                  <Image
                    src="/images/division-residential.png"
                    alt="SP10 Residential Construction Services"
                    fill
                    className="object-cover"
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

                    {/* Detailed Scopes */}
                    <div className="flex flex-col border-t border-[#e8ebef] pt-2">
                      {residentialScopes.map((scope) => (
                        <div
                          key={scope.title}
                          className="flex flex-col py-3 border-b border-[#e8ebef]/70 gap-0.5"
                        >
                          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-[#0f172a]">
                            <CheckIcon className="w-3.5 h-3.5 text-[#b8860b]" />
                            <span>{scope.title}</span>
                          </div>
                          <p className="font-sans text-[12px] leading-[18px] text-[#5e6671] pl-5">
                            {scope.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Planning to Handover */}
                    <div className="flex flex-col gap-1.5 pt-4">
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#8b4513]">
                        FROM PLANNING TO HANDOVER
                      </span>
                      <p className="font-sans text-[12px] leading-[18px] text-[#5e6671]">
                        Scope definition • Material coordination • Site planning
                      </p>
                      <p className="font-sans text-[12px] leading-[18px] text-[#5e6671]">
                        Punch-list review • Closeout documentation • Final walkthrough
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
                  >
                    <span>Request a Residential Estimate</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Shared Construction Process */}
        <section className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px] border-t border-[#e8ebef]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-14">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                  ONE COORDINATED PROCESS
                </span>
              </div>
              <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                A CLEAR PATH FROM PLAN TO COMPLETION.
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] text-[#5e6671] max-w-3xl">
                The same structured approach for Commercial and Residential projects. Final scope, schedule and terms are established in your project agreement.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4 border-t border-[#e8ebef]">
              {processSteps.map((step) => (
                <div key={step.num} className="flex flex-col gap-3">
                  <span className="font-oswald text-[44px] sm:text-[48px] leading-none text-[#8b4513]">
                    {step.num}
                  </span>
                  <h3 className="font-oswald font-medium text-[24px] sm:text-[28px] leading-[34px] uppercase text-[#0f172a]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[22px] text-[#5e6671]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Strip */}
        <QualityStrip />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
