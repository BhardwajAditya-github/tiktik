"use client";

export default function Grid() {
  return (
    <div
      className="absolute left-0 top-0 pointer-events-none opacity-30"
      style={{
        width: 2000,
        height: 2000,

        backgroundImage: `
          linear-gradient(#d1d5db 1px, transparent 1px),
          linear-gradient(90deg, #d1d5db 1px, transparent 1px)
        `,

        backgroundSize: "24px 24px",
      }}
    />
  );
}
