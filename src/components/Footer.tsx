"use client";

import React from "react";
import Link from "next/link";
import { eventConfig } from "@/config/eventConfig";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#010719] text-[#F4F0E6] pt-16 pb-10 border-t border-[rgba(214,166,58,0.20)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* Brand & About */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Link href="/community" className="inline-block self-start">
            <img
              src="/images/bb-logo.png"
              alt="Business & Beyond"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
          <p className="text-[#AAB3C3] text-sm leading-relaxed max-w-md font-light">
            Business & Beyond is the flagship annual event of BNI Kolkata CBD(A) & North. Sourced from RARM Networking Pvt Ltd, it stands as the ultimate platform of innovation, business opportunities, collaborations, and powerful networking.
          </p>
          <p className="text-[#AAB3C3]/70 text-xs tracking-wider uppercase">
            An initiative by RARM Networking Private Limited.
          </p>
          {/* Social Icons — Executive Gold/Ivory hover */}
          <div className="flex gap-3 pt-2">
            <a
              href={eventConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center bg-[#06142F] border border-[rgba(214,166,58,0.20)] hover:border-[#D6A63A] hover:bg-[#D6A63A] hover:text-[#020B24] rounded-[2px] transition-all text-[#F4F0E6]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href={eventConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center bg-[#06142F] border border-[rgba(214,166,58,0.20)] hover:border-[#D6A63A] hover:bg-[#D6A63A] hover:text-[#020B24] rounded-[2px] transition-all text-[#F4F0E6]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href={eventConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center bg-[#06142F] border border-[rgba(214,166,58,0.20)] hover:border-[#D6A63A] hover:bg-[#D6A63A] hover:text-[#020B24] rounded-[2px] transition-all text-[#F4F0E6]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href={eventConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 flex items-center justify-center bg-[#06142F] border border-[rgba(214,166,58,0.20)] hover:border-[#D6A63A] hover:bg-[#D6A63A] hover:text-[#020B24] rounded-[2px] transition-all text-[#F4F0E6]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h3 className="text-[#D6A63A] font-semibold text-xs tracking-[0.20em] uppercase border-b border-[rgba(214,166,58,0.20)] pb-2.5">
            Useful Links
          </h3>
          <ul className="flex flex-col gap-3 text-xs tracking-wider uppercase font-medium text-[#AAB3C3]">
            <li>
              <a href="https://businessandbeyond.in/terms-condition" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6A63A] transition-colors">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="https://businessandbeyond.in/privacy-policies" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6A63A] transition-colors">
                Privacy Policies
              </a>
            </li>
            <li>
              <a href="https://businessandbeyond.in/refund-policies" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6A63A] transition-colors">
                Refund Policies
              </a>
            </li>
            <li>
              <Link href="/community/admin" className="hover:text-[#D6A63A] transition-colors underline">
                Admin Panel (CSV Export)
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h3 className="text-[#D6A63A] font-semibold text-xs tracking-[0.20em] uppercase border-b border-[rgba(214,166,58,0.20)] pb-2.5">
            Contact Details
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-[#AAB3C3]">
            <li className="flex gap-3 items-start">
              <Clock size={16} className="text-[#D6A63A] shrink-0 mt-0.5" />
              <span className="font-light text-xs">{eventConfig.contact.officeHours}</span>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin size={16} className="text-[#D6A63A] shrink-0 mt-0.5" />
              <span className="font-light text-xs leading-relaxed">{eventConfig.contact.address}</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="text-[#D6A63A] shrink-0" />
              <a href={`mailto:${eventConfig.contact.email}`} className="text-xs hover:text-[#D6A63A] transition-colors">
                {eventConfig.contact.email}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={16} className="text-[#D6A63A] shrink-0" />
              <a href={`tel:${eventConfig.contact.phone}`} className="text-xs hover:text-[#D6A63A] transition-colors font-medium text-[#F4F0E6]">
                {eventConfig.contact.phoneLabel}: {eventConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] text-center text-xs text-[#AAB3C3]/70 font-light">
        <p>Copyright © 2026. All rights reserved by RARM Networking Pvt. Ltd.</p>
        <p className="mt-1 text-[11px] text-[#AAB3C3]/40 tracking-wider uppercase">Business & Beyond Official Community Registration</p>
      </div>
    </footer>
  );
}
