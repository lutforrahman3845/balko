"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    tagline: "For individuals getting started",
    monthly: 0,
    annual: 0,
    features: [
      "Up to 3 projects",
      "Basic task boards",
      "1 team member",
      "Community support",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "For growing teams that need more",
    monthly: 12,
    annual: 10,
    features: [
      "Unlimited projects",
      "CRM + companies",
      "Up to 20 members",
      "Analytics dashboards",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "For organizations at scale",
    monthly: 29,
    annual: 24,
    features: [
      "Everything in Pro",
      "Unlimited members",
      "Advanced roles & teams",
      "SSO & audit logs",
      "Dedicated manager",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free, upgrade when you&apos;re ready. No hidden fees.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-card p-1">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              annual ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Annual
            <span className="ml-1.5 text-xs text-emerald-500">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
                plan.highlighted && "border-primary ring-1 ring-primary shadow-lg",
              )}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">${price}</span>
                <span className="text-sm text-muted-foreground">/mo per user</span>
              </div>
              {annual && price > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">billed annually</p>
              )}

              <Button
                className="mt-6"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() =>
                  toast.info(`${plan.name} plan selected (demo — no billing wired).`)
                }
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
