import Image from "next/image";

interface QualityStripProps {
  className?: string;
}

export default function QualityStrip({ className = "" }: QualityStripProps) {
  const commitments = [
    {
      title: "FULLY LICENSED & INSURED",
      note: "Accountability at every stage",
      icon: "/icons/proof-licensed.svg",
    },
    {
      title: "SAFETY-FIRST PROTOCOL",
      note: "A disciplined approach on site",
      icon: "/icons/proof-safety.svg",
    },
    {
      title: "ON-TIME DELIVERY",
      note: "Planning with the end in mind",
      icon: "/icons/proof-ontime.svg",
    },
  ];

  return (
    <section
      aria-label="Quality Standards"
      className={`w-full bg-[#1e2229] py-10 px-6 md:px-12 lg:px-[72px] border-y border-[#343a40]/30 ${className}`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {commitments.map((c) => (
            <div
              key={c.title}
              className="flex items-center gap-[18px] py-2"
            >
              <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                <Image
                  src={c.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-oswald font-medium text-[24px] leading-[29px] tracking-normal text-white uppercase">
                  {c.title}
                </h3>
                <p className="font-sans text-[12px] leading-[15px] text-[#bfc5ce]">
                  {c.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
