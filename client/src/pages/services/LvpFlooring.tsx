/* Maritime Craftsman Design System - LVP Flooring Service Page */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "What is LVP flooring?",
    answer:
      "Luxury vinyl plank is an engineered flooring that mimics real hardwood. It's waterproof, durable, and comes in a wide variety of wood species looks, colours, and textures. Modern LVP is virtually indistinguishable from real wood.",
  },
  {
    question: "Is LVP waterproof?",
    answer:
      "Yes, LVP is 100% waterproof, making it ideal for kitchens, bathrooms, basements, and entryways. Unlike hardwood, it won't warp or swell from moisture exposure.",
  },
  {
    question: "How long does LVP flooring last?",
    answer:
      "Quality LVP flooring typically lasts 15-25 years with normal use. The wear layer protects against scratches, stains, and fading. We install premium products that stand the test of time.",
  },
  {
    question: "Can LVP be installed over existing floors?",
    answer:
      "In many cases, yes. LVP can often be installed over existing hard surfaces like tile, concrete, or old vinyl. We'll assess your current floors and recommend the best approach.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential LVP installations take 1-3 days depending on the area size and subfloor condition. We'll provide a detailed timeline during your estimate.",
  },
];

const galleryImages = [
  { src: "/images/floor.jpg", alt: "Luxury vinyl plank flooring installation" },
  { src: "/images/floor1.jpg", alt: "LVP flooring in living space" },
  { src: "/images/floor2.jpg", alt: "Wood-look vinyl plank flooring" },
];

export default function LvpFlooring() {
  const contentRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/floor.jpg"
            alt="Luxury vinyl plank flooring installation"
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
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              LVP Flooring Installation
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Transform your home's interior with beautiful, durable luxury
              vinyl plank flooring. Waterproof, scratch-resistant, and available
              in stunning wood-look designs.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-3d text-white font-semibold"
            >
              <Link href="/contact">
                Request a Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={contentRef}>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Beautiful Floors That Last
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  Luxury vinyl plank flooring is the ideal choice for Nova
                  Scotia homes. Engineered to handle temperature changes and
                  resist moisture, LVP performs beautifully through our Maritime
                  seasons without the warping or buckling that can affect
                  traditional hardwood.
                </p>
                <p>
                  LVP is incredibly versatile—perfect for any room in your home
                  including basements, kitchens, bathrooms, and entryways. Its
                  waterproof core means you never have to worry about spills,
                  splashes, or humidity affecting your floors.
                </p>
                <p>
                  Today's luxury vinyl plank offers realistic wood-look
                  aesthetics that are virtually indistinguishable from real
                  hardwood, at a fraction of the cost. Choose from a wide range
                  of species, colours, and textures to match your home's style.
                </p>
                <p>
                  Our professional installation ensures proper subfloor
                  preparation and seamless results. We take the time to get
                  every detail right—from moisture testing and levelling to
                  precise cuts around obstacles—so your new floors look
                  beautiful and perform flawlessly for years to come.
                </p>
              </div>

              {/* What's Included */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3 mb-12">
                {[
                  "Free in-home consultation and measurement",
                  "Subfloor assessment and preparation",
                  "Professional LVP installation",
                  "Transitions, trim, and molding",
                  "Furniture moving assistance",
                  "Complete cleanup",
                  "Final walkthrough and care instructions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_88)] shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* FAQ Section */}
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="mb-12">
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="bg-[oklch(0.28_0.06_250)] text-white border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Ready for New Floors?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free estimate for your LVP flooring project. We'll
                      discuss your vision and provide a detailed quote.
                    </p>
                    <Button
                      asChild
                      className="w-full btn-3d text-white font-semibold"
                    >
                      <Link href="/contact">
                        Request a Free Estimate
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Related Services
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/services/decks"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.65_0.18_88)] transition-colors"
                        >
                          Decks →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.65_0.18_88)] transition-colors"
                        >
                          View All Services →
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="py-12 bg-section-muted" ref={galleryRef}>
        <div className="container">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center fade-in">
            Our LVP Flooring Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-stagger">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item fade-in relative aspect-video overflow-hidden rounded-lg group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-section-cedar text-white" ref={ctaRef}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Home's Interior
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready for beautiful new floors? Contact us today for a free
              estimate.
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
