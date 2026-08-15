export interface Speaker {
  name: string;
  role: string;
  company: string;
  image?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface EventConfig {
  eventName: string;
  tagline: string;
  communityTagline: string;
  communityDescription: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  heroImage: string;
  logo: string;
  registrationFee: number;
  razorpayPaymentLink: string;
  speakers: Speaker[];
  schedule: ScheduleItem[];
  faqs: FAQ[];
  contact: {
    email: string;
    phone: string;
    phoneLabel: string;
    address: string;
    officeHours: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
}

export const eventConfig: EventConfig = {
  eventName: "8 × 8 Gathering",
  tagline: "Connecting Businesses. Creating Opportunities.",
  communityTagline: "64 Founders. 8 Curated Tables. One Room.",
  communityDescription: "An invitation-led community built for founders, entrepreneurs, and business builders who believe that the right room can create the right opportunities.",
  date: "16 August 2026",
  time: "[PLACEHOLDER - Event Time]",
  venue: "Workscape by CRED",
  address: "[PLACEHOLDER - Full Venue Address, Kolkata, West Bengal]",
  description: "64 founders. 8 curated tables. One room. Conversation designed to move past small talk, trading context, capital, and craft openly.",
  heroImage: "https://businessandbeyond.in/assets/img/hero/hero-shape-6.webp",
  logo: "/images/bb-logo.png",
  registrationFee: 1500, // INR
  razorpayPaymentLink: "https://rzp.io/l/businessandbeyond-draft", // Configurable Razorpay Payment Link
  speakers: [
    {
      name: "[Speaker Name]",
      role: "[Role / Designation]",
      company: "[Company Name]",
      image: "https://businessandbeyond.in/assets/img/about/about.jpg"
    }
  ],
  schedule: [
    {
      time: "09:00 AM - 10:00 AM",
      title: "Registrations & Morning Networking",
      description: "Pick up your passes and connect over tea and coffee with early attendees."
    },
    {
      time: "10:00 AM - 11:30 AM",
      title: "Interactive Panel: Future of Business in India",
      description: "Prominent founders share insights on growth, scaling, and collaboration."
    },
    {
      time: "11:30 AM - 01:00 PM",
      title: "Mega 121 Conclave",
      description: "Structured 1-on-1 networking sessions to find matches, partners, and clients."
    }
  ],
  faqs: [
    {
      question: "What is Business & Beyond?",
      answer: "Business & Beyond is a premier community for business networking, innovation, and partnership. Sourced from BNI Kolkata CBD(A) & North, it provides the ultimate platform of business opportunities, collaborations, and powerful networking."
    },
    {
      question: "How does the '8 x 8' format work?",
      answer: "The 8 x 8 gathering places 64 founders across 8 curated tables in one room. No random seating. Every seat placement is deliberate, designed to match people building complementary ventures and facilitate deep exchanges of context, capital, and craft."
    },
    {
      question: "How do I join the community?",
      answer: "To join, you must fill out the onboarding application form, confirm your email address by clicking the verification link sent to your inbox, and then complete the membership payment via Razorpay."
    },
    {
      question: "What is included in the membership?",
      answer: "Membership grants you access to our curated community directories, invitations to exclusive monthly events (including our upcoming gathering on 16 August 2026), and access to potential investors and partner networks."
    }
  ],
  contact: {
    email: "businessandbeyond.bni@gmail.com",
    phone: "03369028953",
    phoneLabel: "Harshvardhan Jaiswal",
    address: "23, Townshend Rd, Bakul Bagan, Bhowanipore, Kolkata, West Bengal 700025",
    officeHours: "Mon - Fri: 09:00 - 18:00"
  },
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61559571110028",
    instagram: "https://instagram.com/businessandbeyondindia",
    linkedin: "https://www.linkedin.com/company/business-beyond-kolkata/",
    youtube: "https://www.youtube.com/channel/UCnrFizBvaNfw3PqqmaEtSSg",
    whatsapp: "https://chat.whatsapp.com/[WHATSAPP-COMMUNITY-LINK]"
  }
};
