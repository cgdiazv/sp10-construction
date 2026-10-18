"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "@/components/Icons";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "commercial" | "residential">("all");

  const projects = [
    {
      id: "office-buildout",
      division: "commercial",
      divisionLabel: "COMMERCIAL",
      title: "OFFICE BUILD-OUT",
      subtitle: "TENANT IMPROVEMENTS / INTERIORS",
      location: "Location pending",
      image: "/images/project-office-buildout.png",
      alt: "Commercial office buildout interior with glass partitions",
      description:
        "An adaptable workplace concept balancing collaborative areas, enclosed meeting rooms and a clear circulation plan.",
      scopeItems: "Interior layout • Glass partitions • Millwork • Finish coordination",
      scopeNote: "A considered environment for focused work and shared ideas.",
      footnote: "Illustrative concept. Not a completed SP10 project.",
    },
    {
      id: "custom-modern-home",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "CUSTOM MODERN HOME",
      subtitle: "CUSTOM HOME / STRUCTURAL FRAMING",
      location: "Location pending",
      image: "/images/project-custom-modern-home.png",
      alt: "Custom modern residential home architectural framing",
      description:
        "A custom home concept with strong architectural lines, connected living spaces and a warm material palette.",
      scopeItems: "New construction • Framing • Building envelope • Finish coordination",
      scopeNote: "A home shaped around light, flow and everyday living.",
      footnote: "Illustrative concept. Not a completed SP10 project.",
    },
    {
      id: "commercial-storefront",
      division: "commercial",
      divisionLabel: "COMMERCIAL",
      title: "COMMERCIAL STOREFRONT",
      subtitle: "RETAIL BUILD-OUT / STOREFRONT",
      location: "Location pending",
      image: "/images/project-commercial-storefront.png",
      alt: "Modern retail storefront exterior glass facade",
      description:
        "A retail concept connecting a crisp street-facing facade with a welcoming, flexible customer environment.",
      scopeItems: "Retail layout • Shopfront glazing • Interior finishes • Trade coordination",
      scopeNote: "A strong first impression, supported by practical interior planning.",
      footnote: "Illustrative concept. Not a completed SP10 project.",
    },
    {
      id: "luxury-addition",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "LUXURY ADDITION",
      subtitle: "STRUCTURAL ADDITION / CONCRETE",
      location: "Location pending",
      image: "/images/project-luxury-addition.png",
      alt: "Luxury residential architectural addition pavilion",
      description:
        "A residential expansion concept linking existing living areas with a light-filled pavilion and outdoor terrace.",
      scopeItems: "Structural addition • Framing • Glazing • Architectural concrete",
      scopeNote: "More room to live, with a seamless connection to the original home.",
      footnote: "Illustrative concept. Not a completed SP10 project.",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.division === filter);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
      {/* Header */}
      <Header currentPage="projects" />

      <main className="flex-1 w-full">
        {/* Page Hero: Projects Introduction */}
        <section aria-label="Projects Intro" className="w-full bg-[#1e2229] py-16 sm:py-20 lg:py-[88px] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-white">
                    PORTFOLIO CONCEPTS
                  </span>
                </div>
                <h1 className="font-oswald font-semibold text-[44px] sm:text-[64px] lg:text-[82px] leading-[1.05] uppercase tracking-tight text-white">
                  PURPOSE IN
                  <br />
                  EVERY PROJECT.
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2 pb-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#bfc5ce]">
                  Explore commercial and residential possibilities through four illustrative project concepts. Final project photography and details are pending approval.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#bfc5ce] pt-1">
                  ILLUSTRATIVE CONCEPTS / NOT COMPLETED WORK
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Project Portfolio with Filters */}
        <section className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
            {/* Heading Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                    EXPLORE THE PORTFOLIO
                  </span>
                </div>
                <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a]">
                  FOUR CONCEPTS.
                  <br />
                  A BALANCED PERSPECTIVE.
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

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`py-3 px-6 font-sans font-semibold text-[13px] transition-colors rounded-none cursor-pointer border ${
                  filter === "all"
                    ? "bg-[#1e2229] text-white border-[#1e2229]"
                    : "bg-white text-[#0f172a] border-[#d4d8de] hover:border-[#bfc5ce]"
                }`}
              >
                All projects (4)
              </button>
              <button
                type="button"
                onClick={() => setFilter("commercial")}
                className={`py-3 px-6 font-sans font-semibold text-[13px] transition-colors rounded-none cursor-pointer border ${
                  filter === "commercial"
                    ? "bg-[#1e2229] text-white border-[#1e2229]"
                    : "bg-white text-[#0f172a] border-[#d4d8de] hover:border-[#bfc5ce]"
                }`}
              >
                Commercial (2)
              </button>
              <button
                type="button"
                onClick={() => setFilter("residential")}
                className={`py-3 px-6 font-sans font-semibold text-[13px] transition-colors rounded-none cursor-pointer border ${
                  filter === "residential"
                    ? "bg-[#1e2229] text-white border-[#1e2229]"
                    : "bg-white text-[#0f172a] border-[#d4d8de] hover:border-[#bfc5ce]"
                }`}
              >
                Residential (2)
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col border border-[#d4d8de] bg-white"
                >
                  <div className="relative w-full h-[280px] sm:h-[350px] overflow-hidden bg-zinc-100">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase">
                      <span className="border border-[#8b4513] text-[#8b4513] px-2.5 py-0.5 font-sans">
                        {project.divisionLabel}
                      </span>
                      <span className="text-[#5e6671] font-sans">
                        {project.location}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[38px] uppercase text-[#0f172a]">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[12px] text-[#5e6671] uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-[14px] leading-[22px] text-[#5e6671]">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-1 border-t border-[#e8ebef] pt-4">
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#0f172a]">
                        CONCEPT SCOPE
                      </span>
                      <p className="font-sans text-[13px] leading-[20px] text-[#5e6671]">
                        {project.scopeItems}
                      </p>
                      <p className="font-sans text-[13px] leading-[20px] text-[#5e6671]">
                        {project.scopeNote}
                      </p>
                    </div>

                    <div className="border-t border-[#e8ebef] pt-3">
                      <p className="font-sans text-[12px] text-[#5e6671]">
                        {project.footnote}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Project Inquiry CTA Banner */}
        <section className="w-full bg-[#1e2229] py-20 lg:py-24 px-6 md:px-12 lg:px-[72px] text-white border-t border-[#343a40]">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#bfc5ce]">
                  YOUR PROJECT STARTS HERE
                </span>
              </div>
              <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-white">
                BRING YOUR PLANS.
                <br />
                LET’S DEFINE THE POSSIBILITIES.
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] text-[#bfc5ce] pt-1">
                Planning a business space or a home? Start with the division that fits your project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-8 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
              >
                <span>Discuss a Commercial Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] text-white border border-[#8b4513] py-4 px-8 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px]"
              >
                <span>Discuss a Residential Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
