/* Maritime Craftsman Design System - Fences Service Page */

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
    question: "What types of fencing do you install?",
    answer:
      "We install a variety of fence types including wood privacy fences, picket fences, board-on-board, lattice-top, and more. We'll help you choose the style that best suits your needs for privacy, security, and aesthetics.",
  },
  {
    question: "How long does fence installation take?",
    answer:
      "Installation time depends on the fence length and style. A typical residential fence can be installed in 1-3 days. We'll provide a timeline estimate during your consultation.",
  },
  {
    question: "Do I need a permit for a fence?",
    answer:
      "Permit requirements vary by municipality. Many areas have regulations about fence height, setbacks, and placement. We're familiar with local requirements and will help ensure your fence meets all codes.",
  },
  {
    question: "How do I maintain my fence?",
    answer:
      "Wood fences benefit from periodic staining or sealing to protect against moisture and UV damage. We recommend inspecting your fence annually and addressing any loose boards or posts promptly. We'll provide specific care instructions for your fence type.",
  },
  {
    question: "Can you repair or replace sections of existing fences?",
    answer:
      "Yes, we can repair damaged sections, replace posts, or extend existing fences. We'll assess your current fence and recommend the most cost-effective solution.",
  },
];

const galleryImages = [
  { src: "/images/fence.jpg", alt: "Privacy fence installation" },
  { src: "/images/fence1.jpg", alt: "Wood fence detail" },
  { src: "/images/fence2.jpg", alt: "Fence construction" },
  { src: "/images/fence3.jpg", alt: "Completed fence project" },
];

export default function Fences() {
  const contentRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/fence.jpg"
            alt="Privacy fence installation"
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
              Fence Installation
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Privacy, security, and curb appeal with expertly installed fencing
              solutions. Multiple styles and materials to suit your property.
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
                Define Your Property with Quality Fencing
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  A well-built fence does more than mark property lines—it
                  provides privacy, enhances security, and adds significant curb
                  appeal to your home. Whether you're looking to create a
                  private backyard retreat, keep pets safely contained, or
                  simply define your property boundaries, we build fences that
                  serve your needs and stand up to Nova Scotia's weather.
                </p>
                <p>
                  At Versatile Home Solutions, we approach fence installation
                  with the same attention to detail we bring to all our
                  projects. We set posts properly, use quality materials, and
                  build straight, level fences that look great and last. From
                  classic picket fences to tall privacy screens, we have the
                  expertise to build it right.
                </p>
                <p>
                  We work with you to choose the right style, height, and
                  materials for your property. Our goal is a fence that meets
                  your functional needs while complementing your home's
                  appearance.
                </p>
              </div>

              {/* What's Included */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3 mb-12">
                {[
                  "On-site consultation and measurement",
                  "Style and material recommendations",
                  "Property line verification assistance",
                  "Post setting with concrete footings",
                  "Quality lumber and hardware",
                  "Professional installation",
                  "Gates and hardware as needed",
                  "Complete cleanup",
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
                      Ready for a New Fence?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free estimate for your fence project. We'll measure
                      your property and provide a detailed quote.
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
                          href="/services/lvp-flooring"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.65_0.18_88)] transition-colors"
                        >
                          LVP Flooring →
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
            Our Fence Work
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-stagger">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item fade-in relative aspect-square overflow-hidden rounded-lg group"
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
              Define Your Property Boundaries
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready for privacy, security, and curb appeal? Contact us today for
              a free fence estimate.
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
