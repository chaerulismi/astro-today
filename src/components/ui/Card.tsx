interface CardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ title, className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${className}`}
    >
      <h2 className="mb-4 text-lg font-semibold text-white/90">{title}</h2>
      {children}
    </div>
  );
}
