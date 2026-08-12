import React from "react";

export default function OmniSpaceDashboard() {
  return (
    <div className="flex h-screen w-full bg-zinc-50 font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">OmniSpace</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          <NavItem active icon={<ActivityIcon />} label="Overview" />
          <NavItem icon={<DatabaseIcon />} label="Database" />
          <NavItem icon={<ShieldIcon />} label="Security" />
          <NavItem icon={<ActivityIcon />} label="API Traffic" />
          <NavItem icon={<BookIcon />} label="Local Docs" />
        </nav>
        
        <div className="mt-auto px-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Workspace Active</span>
            </div>
            <p className="text-xs text-zinc-500">Local dev server is running.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white/50 px-8 py-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-zinc-500">Welcome to your local control center.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
              Settings
            </button>
            <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
              Start App
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Status Cards */}
            <StatusCard title="Dependencies" value="Up to date" status="good" />
            <StatusCard title="Database" value="Running" status="good" />
            <StatusCard title="Hardcoded Secrets" value="0 found" status="neutral" />
            <StatusCard title="API Endpoints" value="12 Monitored" status="neutral" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">Recent Activity</h2>
              <div className="flex flex-col gap-4 text-sm">
                <ActivityRow time="12s ago" message="Scanned for secrets in src/" />
                <ActivityRow time="2m ago" message="Monitored GET /api/users" />
                <ActivityRow time="5m ago" message="Started Postgres container" />
              </div>
            </div>
            
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">Scan for Secrets</span>
                  <span className="text-zinc-500">→</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">Generate API Tests</span>
                  <span className="text-zinc-500">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, icon, label }: { active?: boolean; icon: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active 
          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-50" 
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/30 dark:hover:text-zinc-50"
      }`}
    >
      <div className="opacity-70">{icon}</div>
      {label}
    </a>
  );
}

function StatusCard({ title, value, status }: { title: string; value: string; status: "good" | "neutral" | "bad" }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function ActivityRow({ time, message }: { time: string; message: string }) {
  return (
    <div className="flex justify-between border-b border-zinc-100 pb-3 last:border-0 last:pb-0 dark:border-zinc-800">
      <span className="text-zinc-700 dark:text-zinc-300">{message}</span>
      <span className="text-zinc-400">{time}</span>
    </div>
  );
}

// Icons
function ActivityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}
