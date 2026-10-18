import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QualityStrip from "@/components/QualityStrip";
import EstimateForm from "@/components/EstimateForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
      {/* Header */}
      <Header currentPage="contact" />

      <main className="flex-1 w-full">
        {/* Page Hero: Contact Introduction */}
        <section aria-label="Contact Intro" className="w-full bg-[#1e2229] py-16 sm:py-20 lg:py-[88px] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-white">
                    START A CONVERSATION
                  </span>
                </div>
                <h1 className="font-oswald font-semibold text-[44px] sm:text-[64px] lg:text-[82px] leading-[1.05] uppercase tracking-tight text-white">
                  LET’S BUILD
                  <br />
                  WHAT’S NEXT.
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2 pb-2">
                <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#bfc5ce]">
                  Tell us about your commercial or residential project. Share your goals, location and drawings so we can understand the scope from the start.
                </p>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#bfc5ce] pt-1">
                  COMMERCIAL / RESIDENTIAL ESTIMATES
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Project Inquiry Form */}
        <EstimateForm
          sectionTag="PROJECT DETAILS"
          heading={"TELL US WHAT\nYOU HAVE IN MIND."}
          subheading="Commercial or Residential, every project begins with a clear conversation. Share your priorities, tell us where you're building and include any plans you have."
        />

        {/* Section 3: Quality Commitment Strip */}
        <QualityStrip />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
