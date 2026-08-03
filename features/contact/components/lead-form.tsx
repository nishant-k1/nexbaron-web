"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { accent } from "@/lib/accents";
import { buildWhatsAppLink, type DivisionSlug } from "@/lib/divisions";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "tel" | "textarea" | "select";
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
}

const digitalSchema = z.object({
  plan: z.string().optional(),
  name: z.string().min(2, "Please enter your name"),
  businessType: z.string().min(1, "Select your business type"),
  city: z.string().min(2, "Please enter your city"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  goal: z.string().min(1, "Select your goal"),
  message: z.string().min(10, "Tell us a little more (minimum 10 characters)"),
});

const printSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  company: z.string().min(2, "Please enter your company"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  requirement: z.string().min(1, "Select your requirement"),
  quantity: z.string().min(1, "Enter approximate quantity"),
  deadline: z.string().min(1, "Enter your deadline"),
  deliveryPincode: z.string().min(4, "Enter delivery pincode"),
  message: z.string().min(10, "Tell us a little more (minimum 10 characters)"),
});

const fieldConfigs: Record<DivisionSlug, FieldConfig[]> = {
  digital: [
    {
      name: "plan",
      label: "Which plan are you considering?",
      type: "select",
      options: [
        { value: "launch", label: "Launch (₹24,999 + ₹1,499/mo)" },
        { value: "growth", label: "Growth (₹39,999 + ₹3,999/mo)" },
        { value: "scale", label: "Scale (₹59,999 + ₹7,999/mo)" },
        { value: "not-sure", label: "Not sure yet" },
      ],
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your full name",
    },
    {
      name: "businessType",
      label: "Business Type",
      type: "select",
      options: [
        "Restaurant / Cafe",
        "Clinic / Doctor",
        "Law / CA Firm",
        "Salon / Spa / Gym",
        "Real Estate / Builder",
        "Startup / SME",
        "Other",
      ],
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Your city",
    },
    { name: "phone", label: "Phone", type: "tel", placeholder: "WhatsApp number" },
    {
      name: "goal",
      label: "What do you need?",
      type: "select",
      options: [
        "Get found on Google",
        "A website that brings in customers",
        "Answer customers on WhatsApp",
        "Bookings that never get missed",
        "Not sure — I need a recommendation",
      ],
    },
  ],
  print: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your full name",
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      placeholder: "Company / brand name",
    },
    { name: "phone", label: "Phone", type: "tel", placeholder: "WhatsApp number" },
    {
      name: "requirement",
      label: "Requirement",
      type: "select",
      options: [
        "Visiting Cards & Stationery",
        "Brochures / Flyers / Posters",
        "Flex Banners / Vinyl",
        "Sign Boards / Acrylic Signage",
        "Office Branding",
        "Exhibition Materials",
      ],
    },
    {
      name: "quantity",
      label: "Approximate Quantity",
      type: "text",
      placeholder: "e.g. 2,000 cards",
    },
    {
      name: "deadline",
      label: "Required By",
      type: "text",
      placeholder: "e.g. next 2 weeks",
    },
    {
      name: "deliveryPincode",
      label: "Delivery Pincode",
      type: "text",
      placeholder: "Delivery area pincode",
    },
  ],
};

const schemas = {
  digital: digitalSchema,
  print: printSchema,
} as const;

type LeadValues = Record<string, string>;

export function LeadForm({
  division,
  heading,
  subheading,
  initialPlan,
}: {
  division: DivisionSlug;
  heading: string;
  subheading?: string;
  initialPlan?: string;
}) {
  const classes = accent[division];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadValues>({
    resolver: zodResolver(schemas[division] as unknown as z.ZodType<LeadValues>),
    defaultValues: initialPlan ? { plan: initialPlan } : undefined,
  });

  const onSubmit = async (data: LeadValues) => {
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, division }),
      });
      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fallbackMessage =
    division === "digital"
      ? "Hi Nexbaron Digital, I just submitted a consultation request and want to follow up."
      : "Hi Nexbaron Print, I just submitted a bulk/quote request and want to follow up.";

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">{heading}</h2>
      {subheading && <p className="text-sm text-slate-400 mb-6">{subheading}</p>}

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 text-sm">
          Thank you! Your request has been received. We will reach out within a few business hours.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm">
          There was an error submitting the form. Please reach us directly on WhatsApp instead.
          <a
            href={buildWhatsAppLink(division, fallbackMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono font-semibold underline"
          >
            <MessageSquare className="w-4 h-4" /> Open WhatsApp
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldConfigs[division].map((field) => (
            <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
              <Label htmlFor={field.name}>
                {field.label} <span className="text-red-500">*</span>
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  rows={5}
                  placeholder="Tell us about your requirement..."
                  className="mt-2 rounded-lg"
                  aria-invalid={errors[field.name] ? "true" : "false"}
                  {...register(field.name)}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  className="mt-2 flex h-10 w-full border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg aria-[invalid=true]:border-red-500 [&>option]:text-slate-900"
                  aria-invalid={errors[field.name] ? "true" : "false"}
                  defaultValue=""
                  {...register(field.name)}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {field.options?.map((option) =>
                    typeof option === "string" ? (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="mt-2 rounded-lg"
                  aria-invalid={errors[field.name] ? "true" : "false"}
                  {...register(field.name)}
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Describe your project or requirement..."
              className="mt-2 rounded-lg"
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className={`${classes.button} font-bold px-8 rounded-xl shadow-lg w-full sm:w-auto`}
        >
          {isSubmitting ? "Sending..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}
