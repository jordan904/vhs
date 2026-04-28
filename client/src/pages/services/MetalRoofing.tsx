/* Maritime Craftsman Design System - Roofing, Siding & Insulation Service Page
 * Primary money page with detailed content, gallery, FAQ, and strong CTAs
 */

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Award,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Home,
  Thermometer,
  Sun,
  Search,
  CreditCard,
  X,
} from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Home,
    title: "Shingle, Metal & Flat Roofing",
    description:
      "Complete roof installation and replacement. Whether you need asphalt shingles, standing seam metal, or flat roofing, our installation team delivers precision and durability.",
  },
  {
    icon: Wrench,
    title: "Roof Repairs",
    description:
      "Leaks, storm damage, missing shingles, flashing issues. We diagnose fast and fix it right the first time so your home stays protected.",
  },
  {
    icon: Shield,
    title: "Siding, Fascia, Soffit & Eavestroughs",
    description:
      "Vinyl and metal siding installation, plus fascia, soffit, and eavestrough work. One team handles your entire building envelope.",
  },
  {
    icon: Thermometer,
    title: "Insulation",
    description:
      "Blow-in, batt, and wall insulation to keep your home comfortable year-round. Government rebates may apply to help offset costs.",
  },
  {
    icon: Sun,
    title: "Solar-Ready Roof Upgrades",
    description:
      "Preparing your roof for solar panels or maintaining existing solar systems. Future-proof your home while you upgrade.",
  },
  {
    icon: Search,
    title: "Free Annual Drone Inspections",
    description:
      "Every job comes with complimentary annual drone inspections so you always know the condition of your roof.",
  },
];

const whyChooseUs = [
  { icon: Award, text: "GAF-certified - top 5% of roofers in Canada" },
  { icon: Shield, text: "Up to 7-year labour warranty + 50-year materials warranty" },
  { icon: Clock, text: "Free quote within 48 hours from Windsor to Digby" },
  { icon: Zap, text: "Year-round installations at competitive rates" },
  { icon: CreditCard, text: "Flexible financing - don't pay for 3 months" },
  { icon: Shield, text: "Fully insured | Safety Nova Scotia member" },
  { icon: Star, text: "5-star reviews | Experienced with government & residential projects" },
  { icon: Users, text: "One team for everything - no juggling multiple contractors" },
];

const faqs = [
  {
    question: "How long does a roof replacement take?",
    answer:
      "A typical residential roof replacement takes 2-5 days depending on size and complexity. We provide a detailed timeline during your estimate and keep you informed throughout. Our installation team works efficiently to minimize disruption to your daily routine.",
  },
  {
    question: "Do you handle both roofing and siding on the same project?",
    answer:
      "Absolutely. That is one of our biggest advantages. Instead of coordinating with multiple contractors, our team handles roofing, siding, insulation, fascia, soffit, and eavestroughs. One point of contact, one schedule, one team that takes full responsibility.",
  },
  {
    question: "What insulation types do you offer?",
    answer:
      "We install blow-in insulation, batt insulation, and wall insulation. We will assess your home and recommend the best option for your situation. Government rebates may apply depending on the type and scope of work, and we can help you navigate those programs.",
  },
  {
    question: "Are you GAF-certified?",
    answer:
      "Yes. Our installation team is GAF-certified, which places us in the top 5% of roofers in Canada. This certification means we can offer extended manufacturer warranties, including up to 50 years on materials. It is a standard we take seriously.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. We offer flexible financing options including a 3-month payment deferral. We believe quality exterior work should be accessible, and we will work with you to find a payment plan that fits your budget.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve communities from Windsor to Digby across the Annapolis Valley and surrounding areas. Our team will come to you with a free estimate within 48 hours.",
  },
  {
    question: "How do I know if I need a repair or a full replacement?",
    answer:
      "We will walk you through your options honestly, with no pressure and no upselling. After our inspection (including a complimentary drone assessment), we will give you a clear recommendation. Sometimes a targeted repair is all you need, and we will tell you that.",
  },
];

const galleryImages = [
  { name: "img_037a1c06ddef", alt: "Standing seam metal roof installation on residential home" },
  { name: "img_0e371c1b90e9", alt: "Aerial drone view of completed metal roof in Brookside, NS" },
  { name: "img_ec2ea89bf6be", alt: "Standing seam metal roofing detail and ridge cap" },
  { name: "img_9c5ed483a923", alt: "Commercial metal roofing and wall cladding" },
  { name: "img_304b008edcb1", alt: "Vinyl siding installation on residential home" },
  { name: "img_6ac484e66ff4", alt: "Vinyl siding close-up during installation" },
  { name: "img_ae71ce807cb4", alt: "Siding and eavestrough work on two-storey home" },
  { name: "img_bb20814515b3", alt: "Vinyl siding gable detail with decorative vent" },
  { name: "img_dbee0d1ea2c7", alt: "Complete siding installation on grey home exterior" },
  { name: "img_dd1091af7f20", alt: "Upper storey siding over brick facade" },
  { name: "img_284c881383f9", alt: "Metal siding and roofing on outbuilding" },
  { name: "img_15c984a7053e", alt: "Blow-in attic insulation installation" },
  { name: "img_e5f6e4d8623e", alt: "Insulation performance diagram showing summer and winter benefits" },
];

export default function MetalRoofing() {
  const contentRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryPage, setGalleryPage] = useState(0);

  const imagesPerPage = 4;
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const visibleImages = galleryImages.slice(
    galleryPage * imagesPerPage,
    galleryPage * imagesPerPage + imagesPerPage
  );

  function openLightbox(globalIndex: number): void {
    setLightboxIndex(globalIndex);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(): void {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function prevImage(): void {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
  }

  function nextImage(): void {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  }

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <ResponsiveImage
            name="img_037a1c06ddef"
            alt=""
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover hero-zoom"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, oklch(0.22 0.06 250 / 0.88) 0%, oklch(0.22 0.06 250 / 0.65) 100%)" }}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="glass hero-slide-down inline-block px-4 py-1.5 rounded-full font-accent text-[oklch(0.78_0.18_88)] text-sm tracking-wider mb-4">
              GAF-Certified | Fully Insured
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Roofing, Siding &<br />Insulation
            </h1>
            <p className="text-lg text-white/80 mb-8">
              At Versatile Home Solutions, we take the stress out of home exterior projects.
              From roofing and siding to insulation and repairs, we handle it all so you
              don't have to coordinate with five different contractors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="btn-3d text-white font-semibold"
              >
                <Link href="/contact">
                  Get a FREE Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                <a href="tel:+19028245333">
                  Call (902) 824-5333
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={contentRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg">
              One team for your entire building envelope. Our installation team is GAF-certified,
              fully insured, and proud to serve communities from Windsor to Digby.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 fade-in-stagger">
            {services.map((service) => (
              <Card key={service.title} className="card-3d border-0 shadow-md fade-in">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] text-white mb-4 icon-pop">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Homeowners Choose Us
              </h2>
              <p className="text-muted-foreground mb-8">
                Not sure if you need a repair or a full replacement? We will walk you through
                your options honestly. No pressure, no upselling.
              </p>
              <ul className="space-y-4">
                {whyChooseUs.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[oklch(0.28_0.06_250)] text-white shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-in">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <ResponsiveImage
                  name="img_0e371c1b90e9"
                  alt="Aerial view of completed metal roof in the Annapolis Valley by Versatile Home Solutions"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-section-muted" ref={galleryRef}>
        <div className="container">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center fade-in">
            Our Roofing, Siding & Insulation Work
          </h3>
          <div className="relative fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleImages.map((image, index) => {
                const globalIndex = galleryPage * imagesPerPage + index;
                return (
                  <div
                    key={globalIndex}
                    className="gallery-item relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => openLightbox(globalIndex)}
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(globalIndex)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${image.alt}`}
                  >
                    <ResponsiveImage
                      name={image.name}
                      alt={image.alt}
                      width={800}
                      height={450}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <Search className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setGalleryPage(Math.max(0, galleryPage - 1))}
                disabled={galleryPage === 0}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[oklch(0.28_0.06_250)] text-white disabled:opacity-30 transition-opacity hover:opacity-80"
                aria-label="Previous gallery page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-muted-foreground font-medium">
                {galleryPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setGalleryPage(Math.min(totalPages - 1, galleryPage + 1))}
                disabled={galleryPage >= totalPages - 1}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[oklch(0.28_0.06_250)] text-white disabled:opacity-30 transition-opacity hover:opacity-80"
                aria-label="Next gallery page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
          }}
          role="dialog"
          aria-label="Image gallery viewer"
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-10"
            onClick={closeLightbox}
            aria-label="Close gallery viewer"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <picture onClick={(e) => e.stopPropagation()}>
            <source
              type="image/avif"
              srcSet={`/images/optimized/${galleryImages[lightboxIndex].name}-1600.avif 1600w, /images/optimized/${galleryImages[lightboxIndex].name}-1200.avif 1200w`}
            />
            <source
              type="image/webp"
              srcSet={`/images/optimized/${galleryImages[lightboxIndex].name}-1600.webp 1600w, /images/optimized/${galleryImages[lightboxIndex].name}-1200.webp 1200w`}
            />
            <img
              src={`/images/optimized/${galleryImages[lightboxIndex].name}-800.jpg`}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            />
          </picture>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-section-light">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center fade-in">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="fade-in">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-section-cedar text-white" ref={ctaRef}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get a FREE No-Obligation Quote
            </h2>
            <p className="text-white/90 text-lg mb-4">
              We respond within 48 hours. Not sure if you need a repair or a full
              replacement? We will walk you through your options honestly.
            </p>
            <p className="text-white/70 mb-8">
              No pressure. No upselling. Just honest advice from a team that stands behind their work.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-3d-white text-[oklch(0.65_0.18_88)] font-semibold text-lg px-10"
            >
              <Link href="/contact">
                Request a Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
