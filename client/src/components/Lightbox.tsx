import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { name: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center lightbox-overlay"
      style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh]" key={currentIndex}>
        <picture>
          <source
            type="image/avif"
            srcSet={`/images/optimized/${current.name}-1600.avif 1600w, /images/optimized/${current.name}-1200.avif 1200w`}
          />
          <source
            type="image/webp"
            srcSet={`/images/optimized/${current.name}-1600.webp 1600w, /images/optimized/${current.name}-1200.webp 1200w`}
          />
          <img
            src={`/images/optimized/${current.name}-800.jpg`}
            alt={current.alt}
            className="lightbox-image max-w-full max-h-[85vh] object-contain rounded-lg"
            loading="eager"
          />
        </picture>
        <p className="text-white/70 text-center text-sm mt-3">
          {current.alt} — {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
