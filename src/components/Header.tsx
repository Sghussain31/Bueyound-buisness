"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;

  return (
    <header className="w-full z-50 bg-[#020B24] border-b border-[rgba(214,166,58,0.20)]">
      {/* Main Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex justify-between items-center">
        {/* Official Attached Logo */}
        <Link href="/community" className="flex items-center py-2 shrink-0">
          <img
            src="/images/bb-logo.png"
            alt="Business & Beyond"
            className="h-[36px] sm:h-[42px] md:h-[48px] w-auto object-contain transition-opacity hover:opacity-95"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium uppercase tracking-[0.20em] text-[#F4F0E6]">
          <Link
            href="/community#about"
            className="hover:text-[#D6A63A] transition-colors py-1"
          >
            COMMUNITY
          </Link>
          <Link
            href="/community#gathering"
            className="hover:text-[#D6A63A] transition-colors py-1"
          >
            8 × 8
          </Link>
          <Link
            href="/community#founders"
            className="hover:text-[#D6A63A] transition-colors py-1"
          >
            FOUNDERS
          </Link>
          <Link
            href="/community/join"
            className={`hover:text-[#D6A63A] transition-colors py-1 ${
              isLinkActive("/community/join") ? "text-[#D6A63A] font-semibold" : ""
            }`}
          >
            MEMBERSHIP
          </Link>
          <a
            href="https://instagram.com/businessandbeyondindia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D6A63A] transition-colors py-1 flex items-center gap-1.5"
          >
            INSTAGRAM <ExternalLink size={11} className="opacity-80" />
          </a>
          <Link
            href="/community/join"
            className="bb-header-cta ml-2"
          >
            JOIN NOW
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#F4F0E6] hover:text-[#D6A63A] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#06142F] border-b border-[rgba(214,166,58,0.25)] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#F4F0E6]">
            <Link
              href="/community#about"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#D6A63A] py-2 transition-colors border-b border-[rgba(255,255,255,0.06)]"
            >
              COMMUNITY
            </Link>
            <Link
              href="/community#gathering"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#D6A63A] py-2 transition-colors border-b border-[rgba(255,255,255,0.06)]"
            >
              8 × 8 GATHERING
            </Link>
            <Link
              href="/community#founders"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#D6A63A] py-2 transition-colors border-b border-[rgba(255,255,255,0.06)]"
            >
              FOUNDERS & BUILDERS
            </Link>
            <Link
              href="/community/join"
              onClick={() => setIsOpen(false)}
              className={`hover:text-[#D6A63A] py-2 transition-colors border-b border-[rgba(255,255,255,0.06)] ${
                isLinkActive("/community/join") ? "text-[#D6A63A]" : ""
              }`}
            >
              MEMBERSHIP
            </Link>
            <a
              href="https://instagram.com/businessandbeyondindia"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#D6A63A] py-2 transition-colors flex items-center justify-between border-b border-[rgba(255,255,255,0.06)]"
            >
              <span>INSTAGRAM</span>
              <ExternalLink size={14} />
            </a>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/community/join"
                onClick={() => setIsOpen(false)}
                className="bb-btn-primary w-full text-center py-3"
              >
                JOIN NOW
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
