"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { accent } from "@/lib/accents";
import { buildWhatsAppLink, type Division } from "@/lib/divisions";

const schema = z
  .object({
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email").or(z.literal("")),
    phone: z.string().min(7, "Please enter a valid phone number").or(z.literal("")),
    message: z.string().min(10, "Please tell us a bit more (minimum 10 characters)"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Please provide at least an email or phone number",
    path: ["email"],
  });

type ContactValues = z.infer<typeof schema>;

interface ContactFormProps {
  division: Division;
  heading: string;
  subheading?: string;
}

export function ContactForm({ division, heading, subheading }: ContactFormProps) {
  const classes = accent[division];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactValues) => {
    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage(null);
    try {
      const response = await fetch(`/api/${division}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "web",
          name: data.name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          message: data.message,
        }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (response.ok) {
        setStatus("success");
        setStatusMessage(result?.message ?? null);
        reset();
      } else {
        setStatus("error");
        setStatusMessage(result?.message ?? null);
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappFallback =
    division === "digital"
      ? "Hi Nexbaron Digital, I'd like to get in touch about your services."
      : "Hi Nexbaron Print, I'd like to get in touch about a printing requirement.";

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2.5 rounded-xl border ${classes.pill}`}>
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white">{heading}</h2>
      </div>
      {subheading && <p className="text-sm text-slate-400 mb-6 ml-[52px]">{subheading}</p>}

      {status === "success" && (
        <div
          role="status"
          className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 text-sm"
        >
          {statusMessage ??
            "Thank you! Your message has been received. We'll get back to you within a few business hours."}
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm"
        >
          {statusMessage ??
            "There was an error sending your message. Please reach us on WhatsApp instead."}
          <a
            href={buildWhatsAppLink(division, whatsappFallback)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono font-semibold underline"
          >
            <MessageSquare className="w-4 h-4" /> Open WhatsApp
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              id="name"
              placeholder="Your full name"
              className="pl-10 rounded-lg"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                id="email"
                type="email"
                placeholder="you@business.com"
                className="pl-10 rounded-lg"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                className="pl-10 rounded-lg"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="message">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us about your requirement or question..."
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

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className={`${classes.button} font-bold px-8 rounded-xl shadow-lg w-full sm:w-auto`}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
