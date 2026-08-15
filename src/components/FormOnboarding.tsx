"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────
// FORM OPTIONS (module-level constants)
// ─────────────────────────────────────────────────────────
const INDUSTRY_OPTIONS = [
  "Technology", "Finance & Banking", "Healthcare", "Real Estate", "Manufacturing",
  "Retail & E-commerce", "Education", "Media & Entertainment", "Food & Beverage",
  "Logistics & Supply Chain", "Consulting", "Legal", "Agriculture", "Other",
];

const ROLE_OPTIONS = [
  "Founder / Co-Founder", "CEO / Managing Director", "Director", "CXO / VP",
  "Investor / VC", "Business Owner", "Partner", "Freelancer / Consultant", "Other",
];

const REVENUE_OPTIONS = [
  "Pre-revenue / Idea Stage", "Below ₹50L", "₹50L – ₹2Cr", "₹2Cr – ₹10Cr",
  "₹10Cr – ₹50Cr", "₹50Cr+",
];

const SECTOR_OPTIONS = [
  "B2B", "B2C", "D2C", "SaaS", "Marketplace", "Service", "Product", "Mixed", "Other",
];

const PRIMARY_NEED_OPTIONS = [
  "Finding investors / funding", "Finding co-founders or partners", "Customer acquisition",
  "Strategic partnerships", "Talent hiring", "Market expansion", "Knowledge & mentorship",
  "Brand visibility", "Other",
];

const PRIMARY_GOAL_OPTIONS = [
  "Business growth & scaling", "Network expansion", "Learning from peers",
  "Deal-making", "Collaborative projects", "Finding clients", "Exploring new markets", "Other",
];

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
interface FormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  gender: string;
  linkedin: string;
  instagram: string;
  company_name: string;
  role: string;
  industry: string;
  annual_revenue: string;
  business_sector: string;
  other_sector: string;
  product_service: string;
  primary_need: string;
  primary_goal: string;
  about: string;
}

const INITIAL: FormData = {
  name: "", age: "", email: "", phone: "", gender: "", linkedin: "", instagram: "",
  company_name: "", role: "", industry: "", annual_revenue: "", business_sector: "",
  other_sector: "", product_service: "",
  primary_need: "", primary_goal: "", about: "",
};

// ─────────────────────────────────────────────────────────
// FIELD WRAPPER — module level to preserve focus
// ─────────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div className="mb-5" id={id}>
      <label className="block text-xs font-medium uppercase tracking-[0.15em] text-[#F4F0E6] mb-2">
        {label}
        {required && <span className="text-[#D6A63A]"> *</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN FORM COMPONENT
// ─────────────────────────────────────────────────────────
export default function FormOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [submitError, setSubmitError] = useState("");

  function update(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function validateStep(s: number): boolean {
    const e: Partial<FormData> = {};
    if (s === 1) {
      if (!formData.name.trim()) e.name = "Full name is required.";
      const ageNum = parseInt(formData.age, 10);
      if (!formData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100 || String(ageNum) !== formData.age.trim()) {
        e.age = "Please enter a valid age between 18 and 100.";
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email is required.";
      if (!formData.phone.trim() || formData.phone.trim().length < 10) e.phone = "Valid phone number is required.";
      if (!formData.gender) e.gender = "Please select your gender.";
    }
    if (s === 2) {
      if (!formData.company_name.trim()) e.company_name = "Company name is required.";
      if (!formData.role) e.role = "Please select your role.";
      if (!formData.industry) e.industry = "Please select your industry.";
      if (!formData.annual_revenue) e.annual_revenue = "Please select your annual revenue.";
      if (!formData.business_sector) e.business_sector = "Please select your business sector.";
      if (!formData.product_service.trim()) e.product_service = "Please describe your product/service.";
    }
    if (s === 3) {
      if (!formData.primary_need) e.primary_need = "Please select your primary need.";
      if (!formData.primary_goal) e.primary_goal = "Please select your primary goal.";
      if (!formData.about.trim() || formData.about.trim().length < 20) e.about = "Please write at least 20 characters.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep(s => s + 1);
  }

  function prevStep() {
    setStep(s => s - 1);
    setSubmitError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: formData.name.trim(),
        age: parseInt(formData.age, 10),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        linkedin: formData.linkedin.trim() || "",
        instagram: formData.instagram.trim() || "",
        company_name: formData.company_name.trim(),
        role: formData.role,
        industry: formData.industry,
        annual_revenue: formData.annual_revenue,
        business_sector: formData.business_sector,
        other_sector: formData.other_sector.trim() || "",
        product_service: formData.product_service.trim(),
        primary_need: formData.primary_need,
        primary_goal: formData.primary_goal,
        about: formData.about.trim(),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setRegistrationId(data.registration_id);
        setSubmitted(true);
      } else {
        if (data.code === "PAYMENT_PENDING") {
          setSubmitError(`Your application is already approved! Use Registration ID: ${data.registration_id} to access your payment page.`);
        } else {
          setSubmitError(data.error || "Submission failed. Please try again.");
        }
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }

    setSubmitting(false);
  }

  function inputClassName(hasError?: boolean): string {
    return `bb-input ${hasError ? "bb-input-error" : ""}`;
  }

  // ─────────────────────────────────────────────────────────
  // SUCCESS STATE (Executive Navy / Ivory / Gold)
  // ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] overflow-hidden text-left p-8 sm:p-12">
        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#020B24] border border-[#D6A63A] rounded-full flex items-center justify-center mb-6 text-[#D6A63A]">
            <CheckCircle2 size={32} />
          </div>
          
          <span className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-2">
            SUBMISSION COMPLETE
          </span>
          <h2 className="text-3xl font-editorial text-[#F4F0E6] mb-4">
            APPLICATION RECEIVED
          </h2>
          <p className="text-[#AAB3C3] text-sm leading-relaxed mb-8 font-light">
            Your application has been submitted successfully and is currently under review by our curation team.
            You will be notified via email regarding your approval status.
          </p>

          <div className="w-full bg-[#020B24] border border-[rgba(214,166,58,0.30)] rounded-[2px] p-6 mb-6">
            <p className="text-[#D6A63A] text-xs font-semibold uppercase tracking-[0.20em] mb-2">
              REGISTRATION ID
            </p>
            <p className="text-2xl font-mono font-bold text-[#F4F0E6] tracking-wider">
              {registrationId}
            </p>
          </div>

          <p className="text-[#AAB3C3]/60 text-xs font-light">
            Please retain your Registration ID for reference and payment access.
          </p>
        </div>
      </div>
    );
  }

  const stepProgress = [0, 33, 66, 100][step] ?? 33;

  return (
    <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] overflow-hidden text-left">
      {/* Progress Bar */}
      <div className="h-1 bg-[#020B24] w-full">
        <div
          className="h-full bg-[#D6A63A] transition-all duration-300"
          style={{ width: `${stepProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="p-8 border-b border-[rgba(255,255,255,0.08)]">
        <div className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-1">
          STEP {step} OF 3
        </div>
        <h2 className="text-2xl sm:text-3xl font-editorial text-[#F4F0E6]">
          {step === 1 && "Personal Information"}
          {step === 2 && "Business Profile"}
          {step === 3 && "Membership Intent"}
        </h2>
        <p className="text-[#AAB3C3] text-xs sm:text-sm font-light mt-1">
          {step === 1 && "Tell us about yourself to initiate your cohort application."}
          {step === 2 && "Detail your enterprise, revenue range, and market focus."}
          {step === 3 && "Specify your strategic goals and value exchange for the community."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8">

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-name" label="Full Name" required error={errors.name}>
                  <input
                    id="field-name"
                    className={inputClassName(!!errors.name)}
                    value={formData.name}
                    onChange={e => update("name", e.target.value)}
                    placeholder="e.g. Vikramaditya Singhania"
                    autoComplete="name"
                  />
                </Field>
                <Field id="f-age" label="Age" required error={errors.age}>
                  <input
                    id="field-age"
                    type="number"
                    min={18}
                    max={100}
                    className={inputClassName(!!errors.age)}
                    value={formData.age}
                    onChange={e => update("age", e.target.value)}
                    placeholder="e.g. 32"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-email" label="Email Address" required error={errors.email}>
                  <input
                    id="field-email"
                    type="email"
                    className={inputClassName(!!errors.email)}
                    value={formData.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder="vikram@company.com"
                    autoComplete="email"
                  />
                </Field>
                <Field id="f-phone" label="Contact Number" required error={errors.phone}>
                  <input
                    id="field-phone"
                    type="tel"
                    className={inputClassName(!!errors.phone)}
                    value={formData.phone}
                    onChange={e => update("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-gender" label="Gender" required error={errors.gender}>
                  <select
                    id="field-gender"
                    className={inputClassName(!!errors.gender)}
                    value={formData.gender}
                    onChange={e => update("gender", e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </Field>
                <Field id="f-linkedin" label="LinkedIn Profile URL" error={errors.linkedin}>
                  <input
                    id="field-linkedin"
                    className={inputClassName(!!errors.linkedin)}
                    value={formData.linkedin}
                    onChange={e => update("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-instagram" label="Instagram Handle" error={errors.instagram}>
                  <input
                    id="field-instagram"
                    className={inputClassName(!!errors.instagram)}
                    value={formData.instagram}
                    onChange={e => update("instagram", e.target.value)}
                    placeholder="@username"
                  />
                </Field>
              </div>
            </>
          )}

          {/* ── STEP 2: Business Profile ── */}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-company" label="Company / Business Name" required error={errors.company_name}>
                  <input
                    id="field-company"
                    className={inputClassName(!!errors.company_name)}
                    value={formData.company_name}
                    onChange={e => update("company_name", e.target.value)}
                    placeholder="Acme Enterprises Pvt Ltd"
                    autoComplete="organization"
                  />
                </Field>
                <Field id="f-role" label="Your Role" required error={errors.role}>
                  <select
                    id="field-role"
                    className={inputClassName(!!errors.role)}
                    value={formData.role}
                    onChange={e => update("role", e.target.value)}
                  >
                    <option value="">Select your role</option>
                    {ROLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-industry" label="Industry" required error={errors.industry}>
                  <select
                    id="field-industry"
                    className={inputClassName(!!errors.industry)}
                    value={formData.industry}
                    onChange={e => update("industry", e.target.value)}
                  >
                    <option value="">Select industry</option>
                    {INDUSTRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field id="f-revenue" label="Annual Revenue" required error={errors.annual_revenue}>
                  <select
                    id="field-revenue"
                    className={inputClassName(!!errors.annual_revenue)}
                    value={formData.annual_revenue}
                    onChange={e => update("annual_revenue", e.target.value)}
                  >
                    <option value="">Select revenue range</option>
                    {REVENUE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-sector" label="Business Sector" required error={errors.business_sector}>
                  <select
                    id="field-sector"
                    className={inputClassName(!!errors.business_sector)}
                    value={formData.business_sector}
                    onChange={e => update("business_sector", e.target.value)}
                  >
                    <option value="">Select sector</option>
                    {SECTOR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                {formData.business_sector === "Other" && (
                  <Field id="f-other-sector" label="Please Specify Sector" error={errors.other_sector}>
                    <input
                      id="field-other-sector"
                      className={inputClassName(!!errors.other_sector)}
                      value={formData.other_sector}
                      onChange={e => update("other_sector", e.target.value)}
                      placeholder="Describe your sector"
                    />
                  </Field>
                )}
              </div>

              <Field id="f-product" label="Product / Service Overview" required error={errors.product_service}>
                <textarea
                  id="field-product"
                  className={`${inputClassName(!!errors.product_service)} resize-y min-h-[110px]`}
                  value={formData.product_service}
                  onChange={e => update("product_service", e.target.value)}
                  placeholder="Briefly describe your core products, services, or market solution..."
                />
              </Field>
            </>
          )}

          {/* ── STEP 3: Goals & Intent ── */}
          {step === 3 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="f-need" label="Primary Need" required error={errors.primary_need}>
                  <select
                    id="field-need"
                    className={inputClassName(!!errors.primary_need)}
                    value={formData.primary_need}
                    onChange={e => update("primary_need", e.target.value)}
                  >
                    <option value="">Select primary need</option>
                    {PRIMARY_NEED_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field id="f-goal" label="Primary Goal" required error={errors.primary_goal}>
                  <select
                    id="field-goal"
                    className={inputClassName(!!errors.primary_goal)}
                    value={formData.primary_goal}
                    onChange={e => update("primary_goal", e.target.value)}
                  >
                    <option value="">Select primary goal</option>
                    {PRIMARY_GOAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              <Field id="f-about" label="Entrepreneurial Journey & Vision" required error={errors.about}>
                <textarea
                  id="field-about"
                  className={`${inputClassName(!!errors.about)} resize-y min-h-[140px]`}
                  value={formData.about}
                  onChange={e => update("about", e.target.value)}
                  placeholder="Share your business journey, vision, and what you aim to contribute to Business & Beyond..."
                />
                <p className="text-[#AAB3C3]/60 text-xs text-right mt-1">
                  {formData.about.length} characters
                </p>
              </Field>

              {submitError && (
                <div className="bg-[#020B24] border border-red-500/40 rounded-[2px] p-4 mb-5">
                  <p className="text-red-400 text-xs font-medium">{submitError}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Nav */}
        <div className="p-8 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center bg-[#020B24]">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="bb-btn-outline text-xs py-3 px-6"
            >
              <ArrowLeft size={14} /> BACK
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bb-btn-primary text-xs py-3 px-6"
              id={`btn-next-step-${step}`}
            >
              CONTINUE <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="bb-btn-primary text-xs py-3.5 px-7 disabled:opacity-50"
              id="btn-submit-application"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> SUBMITTING APPLICATION...
                </>
              ) : (
                <>
                  SUBMIT APPLICATION <ArrowRight size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
