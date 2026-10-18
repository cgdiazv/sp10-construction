"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "@/components/Icons";
import { X, ChevronLeft, ChevronRight, Play, Images } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

interface Project {
  id: string;
  division: "commercial" | "residential";
  divisionLabel: string;
  title: string;
  subtitle: string;
  location: string;
  coverImage: string;
  media: MediaItem[];
  description: string;
  scopeItems: string;
  scopeNote: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "commercial" | "residential">("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const projects: Project[] = [
    {
      id: "residential-addition-austin",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "RESIDENTIAL ADDITION",
      subtitle: "STRUCTURAL ADDITION / FRAMING & EXPANSION",
      location: "Austin, TX",
      coverImage: "/projects/Residential%20Addition%20Austin/residential-addition-01.jpg",
      media: [
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-01.jpg", alt: "Residential structural addition framing in Austin" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-02.jpg", alt: "Wood framing structural walls" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-03.jpg", alt: "Exterior wall framing and headers" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-04.jpg", alt: "Roof tie-in and rafter installation" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-05.jpg", alt: "Structural sheathing and plywood installation" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-06.jpg", alt: "Building envelope weather barrier" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-07.jpg", alt: "Window openings and corner framing" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-08.jpg", alt: "Interior structural partition framing" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-09.jpg", alt: "Ceiling joists and structural rafters" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-10.jpg", alt: "Addition exterior wall sheathing progress" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-11.jpg", alt: "Addition overview and roof junction" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-12.jpg", alt: "Corner framing alignment and plates" },
        { type: "image", url: "/projects/Residential%20Addition%20Austin/residential-addition-13.jpg", alt: "Completed addition framing shell ready for trades" },
      ],
      description:
        "A full structural home expansion in Austin featuring precision wood framing, foundation tie-ins, heavy-load rafter assemblies, and weather-barrier envelope integration seamlessly connecting to the existing residence.",
      scopeItems: "Structural framing • Foundation & slab tie-in • Exterior envelope • Roofing tie-in • Window rough-ins",
      scopeNote: "Engineered for rock-solid structural integrity and seamless architectural alignment.",
    },
    {
      id: "residential-cabinets-remodeling-austin",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "CUSTOM CABINETS & REMODELING",
      subtitle: "INTERIOR REMODELING / CUSTOM MILLWORK",
      location: "Austin, TX",
      coverImage: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-01.jpg",
      media: [
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-01.jpg", alt: "Custom kitchen cabinets and modern island" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-02.jpg", alt: "Built-in cabinet storage and finish details" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-03.jpg", alt: "Custom millwork and interior carpentry" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-04.jpg", alt: "Kitchen remodeling cabinetry installation" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-05.jpg", alt: "Pantry and storage cabinetry woodwork" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-06.jpg", alt: "Precision cabinet alignments and trim" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-07.jpg", alt: "Custom drawer and cabinet hardware installation" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-08.jpg", alt: "Kitchen cabinet prep and installation progress" },
        { type: "image", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-09.jpg", alt: "Finished residential kitchen remodeling" },
        { type: "video", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-vid-01.mp4", alt: "Custom cabinetry video walkthrough" },
        { type: "video", url: "/projects/Residential%20Cabinets%20Remodeling%20Austin/residential-cabinets-remodeling-vid-02.mp4", alt: "Custom millwork hardware and motion video" },
      ],
      description:
        "High-end interior remodel featuring custom cabinetry, architectural millwork, soft-close hardware, integrated kitchen island prep areas, and flawless woodworking finishes tailored to modern living.",
      scopeItems: "Custom cabinetry • Finish carpentry • Kitchen millwork • Hardware installation • Painting & finishing",
      scopeNote: "Crafted for refined residential aesthetics, smooth ergonomics, and lasting durability.",
    },
    {
      id: "residential-roofing",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "RESIDENTIAL ROOFING",
      subtitle: "COMPLETE ROOF REPLACEMENT / EXTERIOR",
      location: "Houston / Austin, TX",
      coverImage: "/projects/Residential%20Roofing/house-roofing-01.jpg",
      media: [
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-01.jpg", alt: "Residential roofing tear-off and replacement" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-02.jpg", alt: "Decking inspection and synthetic underlayment" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-03.jpg", alt: "Valley flashing and ice and water shield" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-04.jpg", alt: "Architectural shingles layout" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-05.jpg", alt: "Chimney step flashing detail" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-06.jpg", alt: "Roof pitch and ridge vent alignment" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-07.jpg", alt: "Roofing crew installing shingles" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-08.jpg", alt: "Flashing and drip edge installation" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-09.jpg", alt: "Roof slope shingle fastening" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-10.jpg", alt: "Gable and eaves detail work" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-11.jpg", alt: "Underlayment moisture barrier coverage" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-12.jpg", alt: "Roof valley water channel installation" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-13.jpg", alt: "Architectural dimensional shingles" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-14.jpg", alt: "Roof vent and pipe boot installation" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-15.jpg", alt: "Clean roof line view" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-16.jpg", alt: "Upper roof transition and flashing" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-17.jpg", alt: "Full roof installation progress" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-18.jpg", alt: "Ridge cap shingle installation" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-19.jpg", alt: "Finished architectural shingle surface" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-20.jpg", alt: "Completed roof replacement side view" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-21.jpg", alt: "Finished residential roof elevation" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-22.jpg", alt: "Clean gutters and clean site perimeter" },
        { type: "image", url: "/projects/Residential%20Roofing/house-roofing-23.jpg", alt: "Final completed residential roofing project" },
      ],
      description:
        "Full residential roof tear-off and replacement. Project included comprehensive OSB decking inspection and replacement, synthetic underlayment, custom metal flashing around valleys and chimneys, and dimensional architectural shingles engineered for Texas storm conditions.",
      scopeItems: "Complete tear-off • OSB decking repair • Ice & water shield • Architectural shingles • Ridge vent installation",
      scopeNote: "Built to withstand severe heat, driving rain, and Texas wind loads.",
    },
    {
      id: "board-batten-siding",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "BOARD & BATTEN SIDING",
      subtitle: "EXTERIOR SIDING / TRIM & WEATHERPROOFING",
      location: "Houston / Austin, TX",
      coverImage: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-02.jpg",
      media: [
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-02.jpg", alt: "Board and batten siding installation" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-03.jpg", alt: "Exterior vertical siding details" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-04.jpg", alt: "Window trim and casing with board & batten" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-05.jpg", alt: "Corner trim and exterior moisture barrier" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-06.jpg", alt: "Siding panel alignment along eaves" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-07.jpg", alt: "Wall prep and flashing integration" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-08.jpg", alt: "Clean batten spacing and fastening" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-09.jpg", alt: "Soffit and siding junction" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-10.jpg", alt: "Completed board and batten facade" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-11.jpg", alt: "Exterior elevation with board & batten" },
        { type: "image", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-12.jpg", alt: "Final finished siding detailing" },
        { type: "video", url: "/projects/Board%20%26%20Batten%20Siding/board-batten-siding-01.mp4", alt: "Board and batten siding video overview" },
      ],
      description:
        "Modern farmhouse exterior cladding using engineered board and batten siding, high-performance house wrap, custom window casing trim, and weather-sealed joints delivering clean lines and exceptional curb appeal.",
      scopeItems: "Board & batten installation • House wrap & moisture barrier • Custom exterior trim • Fascia & soffit detail • Weather sealing",
      scopeNote: "Architectural vertical styling backed by strict moisture barrier protection.",
    },
    {
      id: "commercial-stucco",
      division: "commercial",
      divisionLabel: "COMMERCIAL",
      title: "COMMERCIAL STUCCO",
      subtitle: "EXTERIOR FINISH / COMMERCIAL BUILDING ENVELOPE",
      location: "Houston / Austin, TX",
      coverImage: "/projects/Commercial%20Stucco/commercial-stucco-01.jpg",
      media: [
        { type: "image", url: "/projects/Commercial%20Stucco/commercial-stucco-01.jpg", alt: "Commercial stucco exterior facade" },
      ],
      description:
        "Commercial building exterior stucco system providing a durable, monolithic facade with crisp corners, control joints, and high-performance weather protection designed for commercial longevity.",
      scopeItems: "Commercial lath & backing • Scratch & brown coats • Acrylic finish coat • Control joints & edge trim",
      scopeNote: "Commercial-grade exterior durability built for long-term weather performance.",
    },
    {
      id: "fiberglass-shower-pan",
      division: "residential",
      divisionLabel: "RESIDENTIAL",
      title: "FIBERGLASS SHOWER PAN",
      subtitle: "BATHROOM WATERPROOFING / CUSTOM SHOWER BASE",
      location: "Houston / Austin, TX",
      coverImage: "/projects/Fiberglass%20Shower%20Pan/fiberglass-shower-pan-01.jpg",
      media: [
        { type: "image", url: "/projects/Fiberglass%20Shower%20Pan/fiberglass-shower-pan-01.jpg", alt: "Fiberglass shower pan waterproofing base" },
        { type: "image", url: "/projects/Fiberglass%20Shower%20Pan/fiberglass-shower-pan-02.jpg", alt: "Shower curb reinforcement and resin coat" },
        { type: "image", url: "/projects/Fiberglass%20Shower%20Pan/fiberglass-shower-pan-03.jpg", alt: "Shower pan drain tie-in and sloped pre-pitch" },
        { type: "video", url: "/projects/Fiberglass%20Shower%20Pan/fiberglass-shower-pan-vid.mp4", alt: "Fiberglass shower pan water barrier video inspection" },
      ],
      description:
        "Custom waterproof fiberglass shower pan build-out with seamless curb reinforcement, engineered pre-pitch drainage, and multi-layer resin application providing an impenetrable foundation for high-end custom tile work.",
      scopeItems: "Subfloor preparation • Custom sloped mortar base • Multi-layer fiberglass application • Curb reinforcement • Drain assembly",
      scopeNote: "Zero-leak waterproofing foundation built for custom bathroom renovations.",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.division === filter);

  const commercialCount = projects.filter((p) => p.division === "commercial").length;
  const residentialCount = projects.filter((p) => p.division === "residential").length;

  const openGallery = (project: Project, index = 0) => {
    setActiveProject(project);
    setActiveMediaIndex(index);
  };

  const closeGallery = useCallback(() => {
    setActiveProject(null);
    setActiveMediaIndex(0);
  }, []);

  const nextMedia = useCallback(() => {
    if (!activeProject) return;
    setActiveMediaIndex((prev) => (prev + 1) % activeProject.media.length);
  }, [activeProject]);

  const prevMedia = useCallback(() => {
    if (!activeProject) return;
    setActiveMediaIndex((prev) => (prev - 1 + activeProject.media.length) % activeProject.media.length);
  }, [activeProject]);

  // Keyboard navigation for gallery modal
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, closeGallery, nextMedia, prevMedia]);

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
                    PORTFOLIO OF COMPLETED WORK
                  </span>
                </div>
                <h1 className="font-oswald font-semibold text-[44px] sm:text-[64px] lg:text-[82px] leading-[1.05] uppercase tracking-tight text-white">
                  BUILT WITH PRECISION.
                  <br />
                  CRAFTED TO ENDURE.
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2 pb-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#bfc5ce]">
                  Explore completed commercial and residential craftsmanship across Houston, Austin and surrounding Texas regions.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#8b4513] pt-1">
                  FEATURED WORK & CAPABILITIES
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
                  RECENT PROJECTS.
                  <br />
                  PROVEN RESULTS.
                </h2>
              </div>
              <div className="lg:col-span-5 pb-1 flex flex-col gap-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#5e6671]">
                  From structural residential additions and custom cabinetry to commercial stucco and roofing, our portfolio showcases the rigor, craftsmanship, and trade coordination behind every SP10 build.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#8b4513]">
                  CLICK ANY PROJECT TO VIEW FULL GALLERY & VIDEOS
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
                All projects ({projects.length})
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
                Commercial ({commercialCount})
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
                Residential ({residentialCount})
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
              {filteredProjects.map((project) => {
                const photoCount = project.media.filter((m) => m.type === "image").length;
                const videoCount = project.media.filter((m) => m.type === "video").length;

                return (
                  <div
                    key={project.id}
                    className="flex flex-col border border-[#d4d8de] bg-white group hover:border-[#8b4513] transition-colors"
                  >
                    {/* Media Container with Click to Open Gallery */}
                    <div
                      onClick={() => openGallery(project, 0)}
                      className="relative w-full h-[280px] sm:h-[350px] overflow-hidden bg-zinc-100 cursor-pointer"
                    >
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="bg-[#1e2229]/80 backdrop-blur-xs text-white border border-white/20 text-[10px] font-sans font-semibold uppercase px-2.5 py-1 tracking-wider">
                          {project.divisionLabel}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {photoCount > 0 && (
                            <span className="bg-[#1e2229]/85 backdrop-blur-xs text-white text-[11px] font-sans font-semibold px-2.5 py-1 flex items-center gap-1">
                              <Images className="w-3 h-3 text-[#8b4513]" />
                              {photoCount} {photoCount === 1 ? "photo" : "photos"}
                            </span>
                          )}
                          {videoCount > 0 && (
                            <span className="bg-[#8b4513] text-white text-[11px] font-sans font-semibold px-2 py-1 flex items-center gap-1">
                              <Play className="w-3 h-3 fill-white" />
                              {videoCount} {videoCount === 1 ? "video" : "videos"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-[#0f172a] font-sans font-semibold text-[13px] py-2.5 px-5 shadow-lg flex items-center gap-2">
                          <Images className="w-4 h-4 text-[#8b4513]" />
                          View Gallery ({project.media.length} items)
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail strip preview */}
                    {project.media.length > 1 && (
                      <div className="grid grid-cols-4 gap-1 p-2 bg-[#f4f5f7] border-b border-[#e8ebef]">
                        {project.media.slice(0, 4).map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openGallery(project, idx)}
                            className="relative h-16 w-full overflow-hidden bg-zinc-200 border border-transparent hover:border-[#8b4513] cursor-pointer transition-colors"
                          >
                            {item.type === "video" ? (
                              <div className="w-full h-full bg-[#1e2229] flex items-center justify-center text-white">
                                <Play className="w-5 h-5 text-[#8b4513] fill-[#8b4513]" />
                              </div>
                            ) : (
                              <Image
                                src={item.url}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                sizes="100px"
                                className="object-cover"
                              />
                            )}
                            {idx === 3 && project.media.length > 4 && (
                              <div className="absolute inset-0 bg-[#0f172a]/75 flex items-center justify-center text-white font-sans font-bold text-[11px]">
                                +{project.media.length - 4}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Card Content */}
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
                          PROJECT SCOPE & TRADES
                        </span>
                        <p className="font-sans text-[13px] leading-[20px] text-[#5e6671]">
                          {project.scopeItems}
                        </p>
                        <p className="font-sans text-[13px] leading-[20px] text-[#5e6671]">
                          {project.scopeNote}
                        </p>
                      </div>

                      <div className="border-t border-[#e8ebef] pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openGallery(project, 0)}
                          className="font-sans font-semibold text-[13px] text-[#8b4513] hover:text-[#73390f] flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Explore Gallery ({project.media.length} items)</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[12px] font-sans text-[#5e6671]">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                Commercial general contracting or custom residential build? Let&apos;s discuss the details of your upcoming project.
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

      {/* Fullscreen Interactive Lightbox Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold text-[#8b4513] uppercase tracking-wider">
                {activeProject.divisionLabel} • {activeProject.location}
              </span>
              <h3 className="font-oswald text-xl sm:text-2xl uppercase tracking-wide">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-sans text-[13px] text-zinc-400">
                {activeMediaIndex + 1} / {activeProject.media.length}
              </span>
              <button
                type="button"
                onClick={closeGallery}
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#8b4513] text-white transition-colors cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Active Media Preview Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden max-w-6xl mx-auto w-full">
            {/* Previous Arrow */}
            {activeProject.media.length > 1 && (
              <button
                type="button"
                onClick={prevMedia}
                className="absolute left-2 sm:left-4 z-10 w-12 h-12 flex items-center justify-center bg-[#1e2229]/80 hover:bg-[#8b4513] text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Previous item"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Active Media Display */}
            <div className="relative w-full h-full flex items-center justify-center p-2">
              {activeProject.media[activeMediaIndex].type === "video" ? (
                <video
                  key={activeProject.media[activeMediaIndex].url}
                  src={activeProject.media[activeMediaIndex].url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[70vh] max-w-full object-contain border border-white/10"
                />
              ) : (
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={activeProject.media[activeMediaIndex].url}
                    alt={activeProject.media[activeMediaIndex].alt || activeProject.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Next Arrow */}
            {activeProject.media.length > 1 && (
              <button
                type="button"
                onClick={nextMedia}
                className="absolute right-2 sm:right-4 z-10 w-12 h-12 flex items-center justify-center bg-[#1e2229]/80 hover:bg-[#8b4513] text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Next item"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Modal Bottom Thumbnail Strip */}
          <div className="max-w-5xl mx-auto w-full overflow-x-auto py-2">
            <div className="flex items-center gap-2 justify-center min-w-max mx-auto px-4">
              {activeProject.media.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveMediaIndex(index)}
                  className={`relative w-16 h-12 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                    activeMediaIndex === index
                      ? "border-[#8b4513] scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.type === "video" ? (
                    <div className="w-full h-full bg-[#1e2229] flex items-center justify-center text-white">
                      <Play className="w-4 h-4 text-[#8b4513] fill-[#8b4513]" />
                    </div>
                  ) : (
                    <Image
                      src={item.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
