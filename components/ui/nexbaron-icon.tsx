export function NexbaronIcon({
  className = "h-6 w-6",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top layer with slight offset for uniqueness */}
      <path
        d="M11.5 2.5a2 2 0 0 0-1.5 0L2.2 6.2a1 1 0 0 0 0 1.8l7.8 3.5a2 2 0 0 0 1.5 0l7.8-3.5a1 1 0 0 0 0-1.8z"
        strokeWidth="1.6"
      />
      {/* Middle layer */}
      <path
        d="M2.5 11.5a1 1 0 0 0 .5.9l7.8 3.5a2 2 0 0 0 1.4 0l7.8-3.5a1 1 0 0 0 .5-.9"
        strokeWidth="1.4"
      />
      {/* Bottom layer */}
      <path
        d="M2.5 16.5a1 1 0 0 0 .5.9l7.8 3.5a2 2 0 0 0 1.4 0l7.8-3.5a1 1 0 0 0 .5-.9"
        strokeWidth="1.2"
      />
    </svg>
  );
}
