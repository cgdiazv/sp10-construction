import React from "react";

export function ArrowUpRight({
  className = "w-3.5 h-3.5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M3 11L11 3M11 3H5.5M11 3V8.5" />
    </svg>
  );
}

export function CheckIcon({
  className = "w-3.5 h-3.5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <polyline points="2.5 7.5 5.5 10.5 11.5 3.5" />
    </svg>
  );
}

export function ArrowUpIcon({
  className = "w-5 h-5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M10 16V4M4 10l6-6 6 6" />
    </svg>
  );
}

export function ArrowDownIcon({
  className = "w-3.5 h-3.5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M7 2.5v9M3.5 8l3.5 3.5L10.5 8" />
    </svg>
  );
}

export function ChevronDownIcon({
  className = "w-3 h-3",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 inline-block ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
    </svg>
  );
}
