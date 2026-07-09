export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      className={`inline-block size-4 animate-spin rounded-full ${className ?? ""}`}
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0%, var(--color-cyan-500) 100%)",
        WebkitMask: "radial-gradient(closest-side, transparent 62%, #000 66%)",
        mask: "radial-gradient(closest-side, transparent 62%, #000 66%)",
      }}
    />
  );
}
