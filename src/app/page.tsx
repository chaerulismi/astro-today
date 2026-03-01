import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Astro Today
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Your daily astronomy dashboard
        </p>
      </header>
      <DashboardGrid />
    </main>
  );
}
