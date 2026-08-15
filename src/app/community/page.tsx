"use client";

import React from "react";
import Link from "next/link";
import { eventConfig } from "@/config/eventConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020B24] text-[#F4F0E6]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#020B24] text-[#F4F0E6] py-24 md:py-32 overflow-hidden border-b border-[rgba(214,166,58,0.20)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#06142F] via-[#020B24] to-[#010719] opacity-80" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl flex flex-col gap-6 text-left">
            {/* Event Highlight Bar */}
            <div className="inline-flex items-center gap-2 bg-[#06142F] border border-[rgba(214,166,58,0.30)] rounded-[2px] px-4 py-1.5 text-[11px] font-semibold text-[#D6A63A] uppercase tracking-[0.20em] self-start">
              <Calendar size={12} className="text-[#D6A63A]" /> UPCOMING GATHERING • {eventConfig.date}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-[#F4F0E6] leading-[1.1]">
              BUSINESS <span className="text-[#D6A63A] font-serif italic">&amp;</span> BEYOND
            </h1>

            <p className="text-xl md:text-2xl font-light text-[#D6A63A] tracking-wide leading-relaxed">
              Connecting Businesses. <span className="text-[#F4F0E6]">Creating Opportunities.</span>
            </p>

            <div className="h-[1px] w-20 bg-[#D6A63A] my-1" />

            <p className="text-[#AAB3C3] text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {eventConfig.communityDescription}
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/community/join" className="bb-btn-primary text-xs py-4 px-8">
                JOIN BUSINESS &amp; BEYOND <ArrowRight size={14} />
              </Link>
              <a href="#about" className="bb-btn-outline text-xs py-4 px-8">
                EXPLORE COMMUNITY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: What is Business & Beyond? */}
      <section id="about" className="py-24 bg-[#06142F] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 text-left">
              <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#D6A63A]" /> 01 — WHAT IS BUSINESS &amp; BEYOND?
              </div>
              <h2 className="text-3xl md:text-4xl font-editorial text-[#F4F0E6] mt-4 leading-snug">
                The Philosophy
              </h2>
            </div>
            <div className="lg:col-span-8 text-left">
              <p className="text-2xl md:text-3xl font-editorial font-light text-[#F4F0E6] leading-relaxed mb-6">
                A curated community built for <span className="text-[#D6A63A]">founders, entrepreneurs</span> and <span className="text-[#D6A63A]">business builders</span> who believe that the right room can create the right opportunities.
              </p>
              <p className="text-[#AAB3C3] text-base leading-relaxed font-light">
                We believe business growth isn&apos;t about random networking or stack metrics. It is about matching the right people, building deep trust, and trading context, capital, and craft openly. Business &amp; Beyond is that room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Who is it for? */}
      <section id="founders" className="py-24 bg-[#020B24] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-left mb-16">
            <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D6A63A]" /> 02 — WHO IS IT FOR?
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial text-[#F4F0E6] mt-4">
              Designed For Builders &amp; Decision Makers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founders */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">01 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Founders</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Building something from zero, with everything on the line. Connect with peers who understand the high stakes of starting up.
              </p>
            </div>

            {/* Entrepreneurs */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">02 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Entrepreneurs</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Turning momentum into markets, quietly and relentlessly. Swap growth playbooks and scaling strategies.
              </p>
            </div>

            {/* Business Owners */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">03 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Business Owners</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Running real operations, real teams, and real numbers. Focus on operational excellence and expanding client networks.
              </p>
            </div>

            {/* Builders */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">04 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Builders</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Shipping products, systems, and structures that outlast trends. Collaborate on structural tech and business integrations.
              </p>
            </div>

            {/* Creators */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">05 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Creators</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Turning taste and audience into enduring businesses. Focus on brand equity, product alignment, and digital distribution.
              </p>
            </div>

            {/* Visionaries */}
            <div className="bb-card p-8 flex flex-col gap-4 text-left">
              <span className="text-xs font-mono font-bold text-[#D6A63A] tracking-widest uppercase">06 / PROFILE</span>
              <h3 className="text-2xl font-editorial text-[#F4F0E6]">Visionaries</h3>
              <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                Seeing the decade ahead before the room catches up. Leverage forward-looking insights to build resilient business models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: What can you gain? */}
      <section className="py-24 bg-[#06142F] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 text-left">
              <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#D6A63A]" /> 03 — WHAT CAN YOU GAIN?
              </div>
              <h2 className="text-3xl md:text-4xl font-editorial text-[#F4F0E6] mt-4">
                The Community Value
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div className="border-b border-[rgba(255,255,255,0.08)] pb-6">
                  <div className="text-2xl font-editorial text-[#F4F0E6] mb-2">01 / Connections</div>
                  <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                    Meet relevant founders, entrepreneurs, investors and professionals who understand the journey.
                  </p>
                </div>
                <div className="border-b border-[rgba(255,255,255,0.08)] pb-6">
                  <div className="text-2xl font-editorial text-[#F4F0E6] mb-2">02 / Perspectives</div>
                  <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                    Expose yourself to new ideas and strategies that challenge your traditional way of thinking.
                  </p>
                </div>
                <div className="border-b border-[rgba(255,255,255,0.08)] pb-6">
                  <div className="text-2xl font-editorial text-[#F4F0E6] mb-2">03 / Collaborations</div>
                  <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                    Find partners, complementary ventures, and joint alliances that expand your addressable market.
                  </p>
                </div>
                <div className="border-b border-[rgba(255,255,255,0.08)] pb-6">
                  <div className="text-2xl font-editorial text-[#F4F0E6] mb-2">04 / Opportunities</div>
                  <p className="text-[#AAB3C3] text-sm leading-relaxed font-light">
                    Gain direct access to customers, strategic hiring candidates, and investor funding routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Why Join Statement */}
      <section className="py-24 bg-[#010719] text-[#F4F0E6] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center justify-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#D6A63A]" /> 04 — WHY JOIN? <span className="h-[1px] w-8 bg-[#D6A63A]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial tracking-tight text-[#F4F0E6] mb-6 leading-tight">
            THE RIGHT ROOM<br /><span className="text-[#D6A63A]">CAN CHANGE EVERYTHING.</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#D6A63A] mx-auto mb-8" />
          <p className="text-[#AAB3C3] text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Meet people who understand the journey. Find people who challenge your thinking. Discover opportunities beyond your immediate network.
          </p>
          <div className="text-xl md:text-2xl font-editorial text-[#D6A63A] tracking-wide italic">
            &ldquo;Don&apos;t just build a business. Build your room.&rdquo;
          </div>
        </div>
      </section>

      {/* Section 05: What Happens Inside? (Experience) */}
      <section className="py-24 bg-[#020B24] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-left mb-16">
            <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D6A63A]" /> 05 — WHAT HAPPENS INSIDE?
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial text-[#F4F0E6] mt-4">
              The Interaction Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">01</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Meet</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">Eight tables. Deliberate placement. No random seating. Built to cross-pollinate expertise.</p>
            </div>
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">02</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Connect</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">Conversation formats designed explicitly to move past shallow networking and small talk.</p>
            </div>
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">03</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Exchange</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">Context, capital, and craft are traded openly. Gain direct guidance on real challenges.</p>
            </div>
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">04</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Collaborate</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">The work that starts in the room continues outside it. Setup projects and cross-trade deals.</p>
            </div>
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">05</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Build</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">Transform raw conversations into active joint ventures, strategic partnerships, and momentum.</p>
            </div>
            <div className="bb-card p-6 flex flex-col gap-2">
              <span className="text-3xl font-editorial text-[#D6A63A]/40">06</span>
              <h4 className="font-editorial text-xl text-[#F4F0E6]">Grow</h4>
              <p className="text-[#AAB3C3] text-sm font-light leading-relaxed">The value of the room compounds as more high-fidelity operators participate. So do you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06: Upcoming Gathering */}
      <section id="gathering" className="py-24 bg-[#06142F] border-b border-[rgba(214,166,58,0.20)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#020B24] border border-[rgba(214,166,58,0.30)] p-8 md:p-16 relative overflow-hidden rounded-[2px]">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 text-left flex flex-col gap-6">
                <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-[#D6A63A]" /> 06 — UPCOMING COMMUNITY GATHERING
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl font-editorial text-[#F4F0E6] tracking-tight">
                    8 × 8 GATHERING
                  </h3>
                  <p className="text-base text-[#D6A63A] font-medium mt-1 uppercase tracking-[0.15em]">
                    64 Founders. 8 Curated Tables. One Room.
                  </p>
                </div>

                <p className="text-[#AAB3C3] text-base leading-relaxed font-light max-w-xl">
                  {eventConfig.description} Sourced as part of B&amp;B&apos;s commitment to build deliberate rooms, this event features structured seating to connect matching operators.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#F4F0E6] font-medium uppercase tracking-wider border-t border-[rgba(255,255,255,0.08)] pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#D6A63A]" />
                    <span>{eventConfig.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#D6A63A]" />
                    <span>{eventConfig.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#D6A63A]" />
                    <span>Kolkata, India</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4 items-center lg:items-end justify-center">
                <Link href="/community/join" className="bb-btn-primary w-full text-center py-4 text-xs">
                  JOIN THE EXPERIENCE
                </Link>
                <p className="text-xs text-[#AAB3C3]/70 text-center lg:text-right font-light">
                  Seating is strictly invitation-led and capped at 64.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social / Ecosystem Links */}
      <section className="py-24 bg-[#020B24]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-4">
            Follow the Movement
          </div>
          <h2 className="text-3xl md:text-4xl font-editorial text-[#F4F0E6] mb-12">
            Stay Connected with the Room
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="https://instagram.com/businessandbeyondindia"
              target="_blank"
              rel="noopener noreferrer"
              className="bb-card p-8 flex flex-col gap-2 items-center text-center group"
            >
              <span className="text-[#D6A63A] font-semibold text-xs tracking-[0.20em] uppercase">Instagram</span>
              <span className="text-lg font-editorial text-[#F4F0E6] group-hover:text-[#D6A63A] transition-colors flex items-center gap-1.5">
                @businessandbeyondindia <ExternalLink size={14} />
              </span>
            </a>

            {/* <a 
              href={eventConfig.socials.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bb-card p-8 flex flex-col gap-2 items-center text-center group"
            >
              <span className="text-[#D6A63A] font-semibold text-xs tracking-[0.20em] uppercase">WhatsApp Channel</span>
              <span className="text-lg font-editorial text-[#F4F0E6] group-hover:text-[#D6A63A] transition-colors flex items-center gap-1.5">
                Join Community <ExternalLink size={14} />
              </span>
            </a> */}

            <a
              href="https://businessandbeyond.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bb-card p-8 flex flex-col gap-2 items-center text-center group"
            >
              <span className="text-[#D6A63A] font-semibold text-xs tracking-[0.20em] uppercase">Official Website</span>
              <span className="text-lg font-editorial text-[#F4F0E6] group-hover:text-[#D6A63A] transition-colors flex items-center gap-1.5">
                businessandbeyond.in <ExternalLink size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/community/join" className="bb-btn-primary shadow-2xl py-3.5 px-5 text-xs">
          JOIN BUSINESS &amp; BEYOND <ArrowRight size={14} />
        </Link>
      </div>

      <Footer />
    </div>
  );
}
