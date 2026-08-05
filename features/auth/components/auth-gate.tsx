"use client";

import { Loader2, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/auth-context";
import { apiRequest, type AuthUser } from "@/lib/api";
import { getGoogleClientId } from "@/lib/google";

type Channel = "email" | "phone" | null;

interface AuthGateProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (result: { token: string; user: AuthUser }) => void;
}

enum Step {
  Method,
  Contact,
}

export function AuthGate({ open, onClose, onSuccess }: AuthGateProps) {
  const { user, division } = useAuth();
  const [step, setStep] = useState<Step>(Step.Method);
  const [channel, setChannel] = useState<Channel>(null);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const targetRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep(Step.Method);
    setChannel(null);
    setName("");
    setTarget("");
    setCode("");
    setOtpSent(false);
    setDevCode(null);
    setError(null);
  };

  useEffect(() => {
    if (open) reset();
  }, [open]);

  useEffect(() => {
    // If sign-in completes elsewhere (e.g. the global One Tap popup) while the
    // dialog is open, close it instead of leaving it stuck on screen.
    if (user && open) onClose();
  }, [user, open, onClose]);

  useEffect(() => {
    if (step === Step.Contact) {
      targetRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!open) return null;

  const isEmail = channel === "email";
  const phoneAuthEnabled =
    division === "digital"
      ? process.env.NEXT_PUBLIC_PHONE_AUTH_ENABLED_DIGITAL === "true"
      : process.env.NEXT_PUBLIC_PHONE_AUTH_ENABLED_PRINT === "true";

  const resetOtp = () => {
    setOtpSent(false);
    setDevCode(null);
    setCode("");
    setCountdown(0);
  };

  const requestOtp = async () => {
    if (!division) return;
    if (!target.trim()) {
      setError(isEmail ? "Please enter your email." : "Please enter your phone number.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest<{ success: boolean; devCode?: string; message?: string }>(
        `/${division}/auth/request-otp`,
        {
          method: "POST",
          body: JSON.stringify({ channel, target, name }),
        },
        division,
      );
      setOtpSent(true);
      setDevCode(data.devCode ?? null);
      setCountdown(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the code.");
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    if (!division) return;
    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest<{
        success: boolean;
        token: string;
        user: AuthUser;
      }>(
        `/${division}/auth/verify`,
        {
          method: "POST",
          body: JSON.stringify({ channel, target, code, name }),
        },
        division,
      );
      onSuccess({ token: data.token, user: data.user });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!division) return;
    const clientId = getGoogleClientId(division);
    if (!clientId) {
      setError("Google sign-in isn't configured. Use email or phone for now.");
      return;
    }
    setError(null);
    try {
      // Plain OAuth2 Authorization Code flow. This is a direct browser
      // navigation to accounts.google.com — NO Google Identity Services
      // script and NO FedCM, so it works even when Chrome blocks or disables
      // third-party sign-in for the site. The authorization code comes back
      // as a query param on /api/auth/google/callback, which exchanges it for
      // tokens server-side.
      const state = JSON.stringify({ nonce: crypto.randomUUID(), division });
      window.sessionStorage.setItem("nexbaron-oauth-state", state);
      // Remember where to come back after the round-trip.
      window.sessionStorage.setItem(
        "nexbaron-auth-return",
        window.location.pathname + window.location.search,
      );

      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.set("client_id", clientId);
      authUrl.searchParams.set(
        "redirect_uri",
        `${window.location.origin}/api/auth/google/callback`,
      );
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("scope", "openid email profile");
      authUrl.searchParams.set("prompt", "select_account");
      authUrl.searchParams.set("state", state);
      window.location.href = authUrl.toString();
    } catch {
      setError("Google sign-in didn't start. Try again, or use email or phone.");
    }
  };

  const isPrint = division === "print";
  const accentBorder = isPrint ? "border-amber-500/30" : "border-teal-500/30";
  const accentShadow = isPrint ? "shadow-amber-500/10" : "shadow-teal-500/10";
  const accentPanel = isPrint
    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
    : "bg-teal-500/10 border-teal-500/30 text-teal-400";
  const accentButton = isPrint
    ? "bg-amber-500 hover:bg-amber-400"
    : "bg-teal-500 hover:bg-teal-400";
  const accentText = isPrint
    ? "text-amber-400 hover:text-amber-300"
    : "text-teal-400 hover:text-teal-300";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in or create an account"
    >
      <button
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sign-in"
      />
      <div
        className={`relative w-full max-w-md rounded-3xl bg-slate-900 border shadow-2xl p-8 ${accentBorder} ${accentShadow}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2.5 rounded-xl border ${accentPanel}`}>
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-white">
              {step === Step.Method
                ? `Continue with Nexbaron ${isPrint ? "Print" : "Digital"}`
                : "Verify it's you"}
            </h2>
            <p className="text-[11px] text-slate-400">
              {step === Step.Method
                ? "Create an account or sign in to continue."
                : `We saved your details — let's verify your ${isEmail ? "email" : "phone"}.`}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
            {error}
          </div>
        )}

        {step === Step.Method && (
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              Sign in with
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 rounded-xl border-white/15 hover:bg-white/5"
              onClick={() => handleGoogleSignIn()}
            >
              <span className="w-5 h-5 grid place-items-center">
                <span className="text-base leading-none font-bold">G</span>
              </span>
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-mono text-slate-500">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <Button
              className={`w-full justify-start gap-3 h-12 rounded-xl text-slate-950 font-semibold ${accentButton}`}
              onClick={() => {
                setChannel("email");
                setStep(Step.Contact);
              }}
            >
              <Mail className="w-4 h-4" /> Continue with Email
            </Button>
            {phoneAuthEnabled && (
              <Button
                variant="outline"
                className={`w-full justify-start gap-3 h-12 rounded-xl border-white/15 ${isPrint ? "hover:border-amber-500/40" : "hover:border-teal-500/40"}`}
                onClick={() => {
                  setChannel("phone");
                  setStep(Step.Contact);
                }}
              >
                <Phone className={`w-4 h-4 ${isPrint ? "text-amber-400" : "text-teal-400"}`} />{" "}
                Continue with Phone
              </Button>
            )}
            <p className="text-center text-[10px] text-slate-500 pt-1">
              We&apos;ll send a one-time passcode to verify &mdash; no password needed.
            </p>
          </div>
        )}

        {step === Step.Contact && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Your Name
                <span className="text-slate-500 font-normal"> (can edit later)</span>
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                {isEmail ? "Email address" : "Phone number"}
              </label>
              <Input
                ref={targetRef}
                value={target}
                onChange={(e) => {
                  setTarget(e.target.value);
                  if (otpSent) resetOtp();
                }}
                placeholder={isEmail ? "you@business.com" : "10-digit mobile number"}
                type={isEmail ? "email" : "tel"}
                className="rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && requestOtp()}
              />
            </div>

            {devCode !== null && (
              <div
                className={`p-3 rounded-xl border text-xs flex gap-2 ${isPrint ? "bg-amber-500/10 border-amber-500/30 text-amber-200" : "bg-teal-500/10 border-teal-500/30 text-teal-200"}`}
              >
                <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Dev mode code: <span className="font-mono font-bold">{devCode}</span> — in
                  production this is sent automatically.
                </span>
              </div>
            )}

            {!otpSent ? (
              <Button
                onClick={requestOtp}
                disabled={loading}
                className={`w-full h-12 rounded-xl text-slate-950 font-bold ${accentButton}`}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send verification code"}
                {!loading && <MessageSquare className="w-4 h-4 ml-2" />}
              </Button>
            ) : (
              <div className="space-y-3">
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Verification code
                </label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  inputMode="numeric"
                  className="rounded-xl text-center font-mono tracking-widest"
                  onKeyDown={(e) => e.key === "Enter" && confirmCode()}
                />
                <Button
                  onClick={confirmCode}
                  disabled={loading}
                  className={`w-full h-12 rounded-xl text-slate-950 font-bold ${accentButton}`}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & continue"}
                </Button>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setDevCode(null);
                    }}
                    className={`text-xs disabled:opacity-40 ${accentText}`}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
                  </button>
                  <button onClick={reset} className="text-xs text-slate-400 hover:text-white">
                    Change method
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
