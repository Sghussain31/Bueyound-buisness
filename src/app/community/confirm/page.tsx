"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

export default function CommunityConfirmPage() {
  return (
    <main className="min-h-screen bg-[#020B24] flex items-center justify-center p-4 text-[#F4F0E6]">
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-14 h-14 bg-[#020B24] border border-[rgba(214,166,58,0.30)] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D6A63A]">
          <Info size={28} />
        </div>
        <h1 className="text-2xl font-editorial text-[#F4F0E6] mb-3">
          Verification Process Updated
        </h1>
        <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-6">
          Email confirmation is no longer required for Business &amp; Beyond applications.
          All applications are reviewed directly by our curation committee, and status updates are sent via email.
        </p>
        <Link href="/community" className="bb-btn-primary text-xs w-full py-3">
          RETURN TO HOME
        </Link>
      </div>
    </main>
  );
}
