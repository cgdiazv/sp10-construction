export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

export interface Project {
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

function isProject(value: Record<string, unknown>): value is Record<string, unknown> & Omit<Project, "id"> {
  const textFields = ["divisionLabel", "title", "subtitle", "location", "coverImage", "description", "scopeItems", "scopeNote"];
  return (value.division === "commercial" || value.division === "residential")
    && textFields.every((field) => typeof value[field] === "string" && value[field] !== "")
    && Array.isArray(value.media)
    && value.media.length > 0
    && value.media.every((item: unknown) => {
      if (typeof item !== "object" || item === null) return false;
      const media = item as Record<string, unknown>;
      return (media.type === "image" || media.type === "video")
        && typeof media.url === "string" && media.url.length > 0
        && (media.alt === undefined || typeof media.alt === "string");
    })
    && value.media.some((item: MediaItem) => item.type === "image" && item.url === value.coverImage);
}

export function mergeProjects(documents: { id: string; data: Record<string, unknown> }[]): Project[] {
  const merged = new Map(defaultProjects.map((project) => [project.id, project]));
  for (const { id, data } of documents) {
    if (data.deleted === true) {
      merged.delete(id);
    } else {
      if (!isProject(data)) throw new Error(`Invalid project document: ${id}`);
      merged.set(id, { ...data, id });
    }
  }
  return Array.from(merged.values());
}

export const defaultProjects: Project[] = [
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
