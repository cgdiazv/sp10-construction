"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckIcon, ArrowUpIcon, ChevronDownIcon } from "@/components/Icons";

interface EstimateFormProps {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
}

export default function EstimateForm({
  sectionTag = "BUILD WITH SP10",
  heading = "YOUR NEXT PROJECT.\nSTARTS HERE.",
  subheading = "Commercial or Residential, every project begins with a clear conversation. Share your priorities, tell us where you're building and include any plans you have.",
}: EstimateFormProps) {
  const [division, setDivision] = useState<"commercial" | "residential">("commercial");
  const [fullName, setFullName] = useState("");
  const [companyOrHomeowner, setCompanyOrHomeowner] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const budgetOptions = [
    "Under $100,000",
    "$100,000 – $250,000",
    "$250,000 – $500,000",
    "$500,000 – $1,000,000",
    "$1,000,000+",
    "Not yet established",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("division", division === "commercial" ? "Commercial" : "Residential");
      formData.append("name", fullName);
      formData.append("companyOrHomeowner", companyOrHomeowner);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("budget", budget);
      formData.append("description", description);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send estimate request. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFullName("");
    setCompanyOrHomeowner("");
    setEmail("");
    setPhone("");
    setLocation("");
    setBudget("");
    setDescription("");
    setFile(null);
    setFileName(null);
    setErrorMessage("");
  };

  return (
    <section id="estimate" className="w-full bg-white py-20 lg:py-24 px-6 md:px-12 lg:px-[72px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Section Heading Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-0.5 bg-[#8b4513]" aria-hidden="true" />
              <span className="font-sans font-semibold text-[11px] leading-[13px] uppercase tracking-wider text-[#0f172a]">
                {sectionTag}
              </span>
            </div>
            <h2 className="font-oswald font-semibold text-[38px] sm:text-[48px] leading-[44px] sm:leading-[54px] uppercase text-[#0f172a] whitespace-pre-line">
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-5 pb-1">
            <p className="font-sans text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#5e6671]">
              {subheading}
            </p>
          </div>
        </div>

        {/* Form and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Form Box (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#d4d8de] p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col gap-2 pb-6 border-b border-[#e8ebef]">
              <h3 className="font-oswald font-medium text-[28px] sm:text-[32px] leading-[40px] sm:leading-[47px] uppercase text-[#0f172a]">
                Request an Estimate
              </h3>
              <p className="font-sans text-[13px] leading-[18px] text-[#5e6671]">
                Share the essentials below. Your division selection helps direct the conversation to the right construction scope.
              </p>
            </div>

            {status === "success" ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-[#fff4ed] text-[#8b4513] flex items-center justify-center border border-[#8b4513]">
                  <CheckIcon className="w-6 h-6 text-[#8b4513]" />
                </div>
                <h4 className="font-oswald text-2xl uppercase text-[#0f172a]">
                  Thank You for Your Inquiry
                </h4>
                <p className="font-sans text-[14px] text-[#5e6671] max-w-md">
                  We have received your estimate request. Our team will review your details and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 text-[13px] font-semibold text-[#8b4513] hover:underline cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-6">
                {/* Division Selector */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                    Select Division
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Commercial radio card */}
                    <button
                      type="button"
                      onClick={() => setDivision("commercial")}
                      className={`flex items-center gap-3 p-3.5 border transition-all text-left cursor-pointer ${
                        division === "commercial"
                          ? "bg-[#fff4ed] border-[#8b4513]"
                          : "bg-white border-[#d4d8de] hover:border-[#bfc5ce]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          division === "commercial"
                            ? "border-[#8b4513]"
                            : "border-[#5e6671]"
                        }`}
                      >
                        {division === "commercial" && (
                          <div className="w-2 h-2 rounded-full bg-[#8b4513]" />
                        )}
                      </div>
                      <span className="font-sans font-medium text-[13px] text-[#0f172a]">
                        Commercial
                      </span>
                    </button>

                    {/* Residential radio card */}
                    <button
                      type="button"
                      onClick={() => setDivision("residential")}
                      className={`flex items-center gap-3 p-3.5 border transition-all text-left cursor-pointer ${
                        division === "residential"
                          ? "bg-[#fff4ed] border-[#8b4513]"
                          : "bg-white border-[#d4d8de] hover:border-[#bfc5ce]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          division === "residential"
                            ? "border-[#8b4513]"
                            : "border-[#5e6671]"
                        }`}
                      >
                        {division === "residential" && (
                          <div className="w-2 h-2 rounded-full bg-[#8b4513]" />
                        )}
                      </div>
                      <span className="font-sans font-medium text-[13px] text-[#0f172a]">
                        Residential
                      </span>
                    </button>
                  </div>
                </div>

                {/* Identity fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Company / Homeowner Name
                    </label>
                    <input
                      type="text"
                      value={companyOrHomeowner}
                      onChange={(e) => setCompanyOrHomeowner(e.target.value)}
                      placeholder="Company or homeowner name"
                      className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none"
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none"
                    />
                  </div>
                </div>

                {/* Project location & Estimated budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Project Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Project address or area (e.g. Houston, Austin)"
                      className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                      Estimated Budget
                    </label>
                    <div className="relative">
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full appearance-none border border-[#d4d8de] bg-white p-3.5 pr-8 font-sans text-[13px] text-[#0f172a] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none cursor-pointer"
                      >
                        <option value="">
                          Select a budget range
                        </option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0f172a]">
                        <ChevronDownIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your goals, scope, timeline and any existing plans…"
                    className="border border-[#d4d8de] bg-white p-3.5 font-sans text-[13px] text-[#0f172a] placeholder-[#5e6671] focus:outline-none focus:border-[#8b4513] transition-colors rounded-none resize-y"
                  />
                </div>

                {/* File Upload Zone */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-[12px] leading-[15px] text-[#0f172a]">
                    File Upload
                  </label>
                  <label className="border border-dashed border-[#d4d8de] bg-[#f4f5f7] hover:border-[#8b4513] p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setFileName(selectedFile.name);
                        }
                      }}
                    />
                    <ArrowUpIcon className="w-6 h-6 text-[#8b4513]" />
                    <span className="font-sans font-semibold text-[13px] text-[#0f172a]">
                      {fileName || "Add architectural plans / drawings"}
                    </span>
                    <span className="font-sans text-[11px] text-[#5e6671]">
                      Choose files or drag them here. PDF, DWG or JPG.
                    </span>
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[13px] font-sans">
                    {errorMessage || "Failed to send message. Please try again or call us directly."}
                  </div>
                )}

                {/* Legal note */}
                <p className="font-sans text-[12px] leading-[17px] text-[#5e6671]">
                  We&apos;ll use these details to discuss your project inquiry. Please do not include sensitive personal information. Submitting a request does not create a construction agreement.
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-[18px] bg-[#8b4513] hover:bg-[#73390f] disabled:bg-[#8b4513]/60 text-white border border-[#8b4513] py-4 px-6 transition-colors rounded-none font-sans font-semibold text-[13px] leading-[16px] cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>{status === "submitting" ? "Sending Request..." : "Submit Estimate Request"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Dark Sidebar Card */}
            <div className="bg-[#1e2229] p-8 flex flex-col gap-6 text-white border border-[#343a40]">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#8b4513]" aria-hidden="true" />
                  <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#bfc5ce]">
                    TALK TO SP10
                  </span>
                </div>
                <h3 className="font-oswald font-normal text-[28px] sm:text-[30px] leading-[34px] uppercase text-white">
                  A DIRECT LINE.
                  <br />
                  A CLEAR STARTING POINT.
                </h3>
              </div>

              <div className="w-full h-[1px] bg-[#343a40]" />

              <div className="flex flex-col gap-5 font-sans">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#bfc5ce] uppercase tracking-wider">
                    CALL
                  </span>
                  <a href="tel:+18327752022" className="text-[14px] text-white hover:text-[#bfc5ce] transition-colors">
                    +1 (832) 775-2022
                  </a>
                </div>

                <div className="w-full h-[1px] bg-[#343a40]/60" />

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#bfc5ce] uppercase tracking-wider">
                    EMAIL
                  </span>
                  <a href="mailto:info@sp10construction.com" className="text-[14px] text-white hover:text-[#bfc5ce] transition-colors">
                    info@sp10construction.com
                  </a>
                </div>

                <div className="w-full h-[1px] bg-[#343a40]/60" />

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#bfc5ce] uppercase tracking-wider">
                    SERVICE AREA
                  </span>
                  <span className="text-[14px] text-white">
                    Houston, Austin
                  </span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#343a40]" />

              <p className="font-sans text-[12px] leading-[17px] text-[#bfc5ce]">
                Commercial general contracting and custom residential construction across Houston and Austin.
              </p>
            </div>

            {/* Light Bottom Card */}
            <div className="bg-[#e8ebef] p-8 flex flex-col gap-4 border border-[#d4d8de]">
              <h4 className="font-oswald font-normal text-[24px] sm:text-[25px] leading-[34px] sm:leading-[37px] uppercase text-[#0f172a]">
                GOOD PLANS START WITH CLARITY.
              </h4>
              <p className="font-sans text-[13px] leading-[20px] text-[#464d57]">
                Have a site address, an outline of your scope and a target timeline ready. Early drawings or inspiration can help frame the discussion.
              </p>
              <div className="flex items-center gap-6 pt-2 border-t border-[#d4d8de]">
                <Link
                  href="/services#commercial"
                  className="font-sans font-semibold text-[13px] text-[#0f172a] hover:text-[#8b4513] transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8b4513]"
                >
                  Commercial
                </Link>
                <Link
                  href="/services#residential"
                  className="font-sans font-semibold text-[13px] text-[#0f172a] hover:text-[#8b4513] transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8b4513]"
                >
                  Residential
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
