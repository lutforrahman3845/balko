import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Kanban,
  Users,
  Calendar,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Balko — CRM & Project Management",
  description: "The CRM and project management platform that keeps your team in sync.",
};

const FEATURES = [
  { icon: Kanban, title: "Task boards", body: "Kanban and table views with drag-and-drop, filters, and instant search." },
  { icon: Users, title: "CRM built in", body: "Contacts, companies, and deals connected to the work your team is doing." },
  { icon: BarChart3, title: "Analytics", body: "Dashboards that turn activity into revenue, pipeline, and performance insights." },
  { icon: Calendar, title: "Calendar", body: "Keep deadlines, meetings, and milestones in one shared schedule." },
  { icon: Shield, title: "Roles & teams", body: "Organize people into teams and departments with the right access." },
  { icon: Zap, title: "Fast by default", body: "A snappy, modern interface your team will actually enjoy using." },
];

const STATS = [
  { value: "12k+", label: "Teams" },
  { value: "4.9/5", label: "Avg. rating" },
  { value: "99.9%", label: "Uptime" },
  { value: "40%", label: "Faster delivery" },
];

const FAQ = [
  { q: "Is there a free trial?", a: "Yes — every plan starts with a 14-day free trial. No credit card required to get started." },
  { q: "Can I import my existing data?", a: "You can import contacts, companies, and tasks from CSV, or connect your tools via our integrations." },
  { q: "How does billing work?", a: "Plans are billed per seat, monthly or annually. You can upgrade, downgrade, or cancel anytime." },
  { q: "Is my data secure?", a: "We use industry-standard encryption in transit and at rest, with role-based access controls." },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            New — Analytics dashboards are here
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Run your whole team from one clean workspace
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Balko brings your CRM, projects, tasks, and analytics together — so
            everyone knows what to do next, and nothing slips.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/sign-up">
                Start free trial <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/">View live demo</Link>
            </Button>
          </div>

          {/* Preview frame */}
          <div className="mx-auto mt-14 max-w-4xl rounded-xl border bg-card p-2 shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-1.5 px-2 py-2">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-primary/10 via-muted to-background grid place-items-center">
              <BarChart3 className="size-16 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything your team needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            One platform for customers, projects, and the people who move them
            forward.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to get organized?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Join thousands of teams running their work on Balko. Start your free
            trial today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link href="/sign-up">Get started free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4" /> 14-day free trial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4" /> No credit card required
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
