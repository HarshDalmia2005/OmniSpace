"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ShieldAlert,
  Activity,
  BookOpen,
  Terminal,
  Sparkles,
  ChevronRight,
  Settings,
  Cpu,
  Box,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface ContainerItem {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  ports?: string;
}

export default function OmniSpace() {
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", label: "System Overview", icon: Activity },
    { id: "security", label: "Secret Scanner", icon: ShieldAlert },
    { id: "network", label: "API Proxy", icon: Cpu },
    { id: "docs", label: "Local Docs", icon: BookOpen },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      {/* Floating Sidebar */}
      <aside className="relative z-10 flex w-72 flex-col bg-white/[0.02] border-r border-white/[0.05] p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.3)] text-black">
            <Terminal size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">OmniSpace</h1>
            <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Local Engine</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === item.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={18} className="relative z-10" />
              <span className="relative z-10">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto relative z-10"
                >
                  <ChevronRight size={16} className="text-emerald-400" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-black/40 border border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-500">SYSTEM STATUS</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-sm text-white">All services optimal</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-light text-white tracking-tight">
              {navItems.find((i) => i.id === activeTab)?.label}
            </h2>
            <p className="text-zinc-500 mt-1 font-mono text-sm">C:\Users\harsh\Workspace\OmniSpace</p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.05] text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.06]">
            <Settings size={18} />
          </button>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {activeTab === "overview" && <OverviewTab />}
            {activeTab !== "overview" && (
              <div className="flex h-full items-center justify-center border border-dashed border-white/[0.1] rounded-2xl bg-white/[0.01]">
                <div className="text-center">
                  <Sparkles size={32} className="mx-auto mb-4 text-emerald-400/50" />
                  <p className="text-zinc-400 font-mono text-sm">Module loading...</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function OverviewTab() {
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [activeCount, setActiveCount] = useState<number>(0);
  const [dockerOnline, setDockerOnline] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchContainers = async () => {
    try {
      const res = await fetch("/api/containers");
      const data = await res.json();
      if (data.online) {
        setContainers(data.containers || []);
        setActiveCount(data.activeCount || 0);
        setDockerOnline(true);
        setErrorMsg(null);
      } else {
        setDockerOnline(false);
        setActiveCount(0);
        setContainers([]);
        setErrorMsg(data.error || "Docker daemon not available");
      }
    } catch {
      setDockerOnline(false);
      setActiveCount(0);
      setContainers([]);
      setErrorMsg("Failed to connect to container API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* Action Center */}
      <div className="col-span-2 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <StatCard
            title="Active Containers"
            value={loading ? "..." : dockerOnline ? activeCount.toString() : "Offline"}
            subtitle={dockerOnline ? `${containers.length} total registered` : "Docker daemon unreachable"}
            icon={<Terminal size={20} className="text-indigo-400" />}
            status={dockerOnline ? "normal" : "warning"}
          />
          <StatCard
            title="Secrets Detected"
            value="0"
            subtitle="Real-time file monitoring"
            status="good"
            icon={<ShieldAlert size={20} className="text-emerald-400" />}
          />
        </div>

        {/* Docker Containers Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
              <Box size={16} className="text-indigo-400" /> Container Management
            </h3>
            <button
              onClick={() => {
                setLoading(true);
                fetchContainers();
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {!dockerOnline ? (
            <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-300 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <div>
                <p className="font-medium">Docker Daemon Not Running</p>
                <p className="text-xs text-amber-400/80 mt-0.5">
                  {errorMsg || "Make sure Docker Desktop or local Docker service is started."}
                </p>
              </div>
            </div>
          ) : containers.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 font-mono text-sm">
              No containers found on local engine.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05]">
              {containers.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        c.state === "running" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-zinc-600"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs font-mono text-zinc-500">
                        {c.image} &bull; {c.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                        c.state === "running"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {c.state}
                    </span>
                    <p className="text-xs font-mono text-zinc-500 mt-1">{c.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 rounded-2xl border border-white/[0.08] bg-black/20 p-6 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-6">Real-Time Event Stream</h3>
          <div className="flex flex-col gap-1 font-mono text-sm">
            <LogLine time="16:42:01" msg="Workspace initialized successfully." type="info" />
            <LogLine time="16:42:05" msg="Started Next.js development server on port 3000." type="success" />
            <LogLine time="16:45:12" msg="Background secret scanner attached to file watcher." type="info" />
            <LogLine time="16:50:33" msg="API proxy intercepting traffic on localhost:8080." type="warning" />
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="col-span-1 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-6">
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-6 flex items-center gap-2">
          <Code2 size={16} className="text-emerald-400" /> Auto-Generator
        </h3>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          OmniSpace is actively monitoring your workflow. When you interact with the UI, the engine will automatically generate Playwright tests based on network traffic.
        </p>
        <button className="w-full rounded-xl bg-white text-black py-3 px-4 font-semibold text-sm transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Force Scan Project
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, status, icon }: any) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/[0.05]">{icon}</div>
      </div>
      <p className="text-3xl font-light text-white mb-1">{value}</p>
      <h3 className="text-sm font-mono text-zinc-500 uppercase">{title}</h3>
      {subtitle && <p className="text-xs font-mono text-zinc-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function LogLine({ time, msg, type }: any) {
  const color = type === "success" ? "text-emerald-400" : type === "warning" ? "text-amber-400" : "text-zinc-500";
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 py-2 border-b border-white/[0.03] last:border-0"
    >
      <span className={color}>[{time}]</span>
      <span className="text-zinc-300">{msg}</span>
    </motion.div>
  );
}
