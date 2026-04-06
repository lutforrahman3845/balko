import { Rocket, Zap, ShieldCheck, LayoutDashboard } from "lucide-react";
const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-12">
      {/* Visual Identity */}
      <div className="relative mb-10 group">
        <div className="absolute -inset-6 bg-blue-500/15 rounded-full blur-3xl animate-pulse group-hover:bg-blue-500/25 transition-all duration-700" />
        <div className="relative size-24 rounded-[2rem] bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 rotate-3 transition-transform group-hover:rotate-0 duration-500 ring-4 ring-white/10">
          <Rocket className="size-12 text-white" />
        </div>
      </div>

      {/* Headline & Subtitle */}
      <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl mb-6 bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
        System Operational.
      </h1>

      <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12">
        We've successfully deployed the core <span className="font-bold text-foreground underline decoration-blue-500/40 underline-offset-8">Balko</span> task management engine. While you can manage your work now, a comprehensive analytics dashboard is currently in development and will arrive in our next major update.
      </p>

      {/* Capability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-14">
        {[
          { icon: ShieldCheck, title: "Task Manager", desc: "Full CRUD lifecycle live.", color: "text-emerald-500" },
          { icon: Zap, title: "Dynamic Sync", desc: "Real-time state updates.", color: "text-amber-500" },
          { icon: LayoutDashboard, title: "Analytics", desc: "Advanced dashboard UI.", color: "text-blue-500" },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-2xl border bg-card/40 backdrop-blur-sm flex flex-col items-center gap-3 text-center transition-all hover:bg-card hover:shadow-xl hover:shadow-blue-500/5 group border-white/5">
            <item.icon className={`size-7 ${item.color} mb-1 group-hover:scale-110 transition-transform`} />
            <div>
              <p className="text-[13px] font-bold uppercase tracking-widest text-foreground/80 mb-2">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-tight px-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 animate-pulse">
        Version 1.0.0 Stable Build
      </p>
    </div>
  );
};

export default DashboardPage;