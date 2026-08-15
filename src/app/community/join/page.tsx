"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormOnboarding from "@/components/FormOnboarding";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020B24] text-[#F4F0E6]">
      <Header />

      <main className="flex-grow py-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="max-w-3xl mx-auto mb-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs text-[#AAB3C3] hover:text-[#D6A63A] font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO COMMUNITY
          </Link>
        </div>

        {/* Onboarding Form */}
        <div className="max-w-3xl mx-auto">
          <FormOnboarding />
        </div>
      </main>

      <Footer />
    </div>
  );
}
