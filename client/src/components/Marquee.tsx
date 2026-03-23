const marqueeItems = [
  "Metal Roofing",
  "Custom Decks",
  "Sheds & Outbuildings",
  "Fences",
  "LVP Flooring",
  "Exterior Projects",
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="bg-[oklch(0.22_0.06_250)] py-4 overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-white/90 font-accent text-sm tracking-wider px-6">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.18_88)] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
