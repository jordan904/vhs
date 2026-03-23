/* Maritime Craftsman Design System - Garbage Bins & Garden Boxes Service Page */

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
    question: "What sizes of garbage bin enclosures do you build?",
    answer:
      "We build enclosures to fit your specific needs—from single-bin units to larger enclosures that hold multiple bins plus recycling containers. We'll measure your bins and design an enclosure that fits perfectly.",
  },
  {
    question: "Can enclosures be placed indoors or outdoors?",
    answer:
      "Yes, we build both interior and exterior enclosures. Indoor enclosures are great for garages or utility areas, while outdoor enclosures keep bins accessible but hidden from view. We'll recommend the best approach for your situation.",
  },
  {
    question: "What materials are used for garden boxes?",
    answer:
      "We typically use cedar or pressure-treated lumber for garden boxes. Cedar is naturally rot-resistant and looks beautiful, while pressure-treated lumber offers durability at a lower cost. We can discuss which option is best for your needs.",
  },
  {
    question: "How deep should garden boxes be?",
    answer:
      "Garden box depth depends on what you plan to grow. Most vegetables do well in 12-18 inch deep boxes, while root vegetables may need 18-24 inches. We'll help you determine the right depth for your gardening goals.",
  },
  {
    question: "Can you match these structures to my existing property?",
    answer:
      "Absolutely. We can design enclosures and garden boxes that complement your home's style, using similar materials, colours, and design elements. This creates a cohesive look across your property.",
  },
];

const galleryImages = [
  { src: "/images/greenhouse.jpg", alt: "Greenhouse structure" },
];

export default function GarbageBinsGardenBoxes() {
  const contentRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/greenhouse.jpg"
            alt="Garden structures"
            className="w-full h-full object-cover hero-zoom"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, oklch(0.22 0.06 250 / 0.88) 0%, oklch(0.22 0.06 250 / 0.65) 100%)" }}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="glass hero-slide-down inline-block px-4 py-1.5 rounded-full font-accent text-[oklch(0.72_0.16_90)] text-sm tracking-wider mb-4">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Greenhouses, Garbage Bin Enclosures & Garden Boxes
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Custom enclosures and garden structures that blend function with
              aesthetics. Keep your property tidy and beautiful.
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
                Functional Beauty for Your Property
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  Sometimes it's the smaller projects that make the biggest
                  difference in how your property looks and functions. A
                  well-designed garbage bin enclosure hides unsightly bins while
                  keeping them accessible. Raised garden boxes make gardening
                  easier and more productive. These custom structures add both
                  function and curb appeal.
                </p>
                <p>
                  At Versatile Home Solutions, we bring the same quality
                  craftsmanship to these projects as we do to larger builds.
                  Whether you need a simple bin enclosure or an elaborate raised
                  bed garden system, we design and build structures that serve
                  your needs and look great doing it.
                </p>
              </div>

              {/* Garbage Bin Enclosures */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Garbage Bin Enclosures
              </h3>
              <p className="text-muted-foreground mb-4">
                Keep your bins out of sight while maintaining easy access. Our
                enclosures are built to last and designed to complement your
                property.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Custom sized to fit your bins",
                  "Interior or exterior placement",
                  "Easy-access doors and lids",
                  "Durable, weather-resistant construction",
                  "Design options to match your home",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.58_0.16_90)] shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Garden Boxes */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Garden Boxes
              </h3>
              <p className="text-muted-foreground mb-4">
                Raised garden beds make gardening more accessible and
                productive. We build sturdy, attractive boxes that will serve
                you for years.
              </p>
              <ul className="space-y-3 mb-12">
                {[
                  "Custom sizes and heights",
                  "Quality cedar or treated lumber",
                  "Proper drainage design",
                  "Optional trellises and covers",
                  "Built to last many seasons",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.58_0.16_90)] shrink-0 mt-0.5" />
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
                      Ready to Get Organized?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free estimate for your enclosure or garden box
                      project. We'll design the perfect solution for your needs.
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
                          href="/services/fences"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.58_0.16_90)] transition-colors"
                        >
                          Fences →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/sheds-outbuildings"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.58_0.16_90)] transition-colors"
                        >
                          Sheds & Outbuildings →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="hover-slide-right-sm inline-block text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.58_0.16_90)] transition-colors"
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
            Our Custom Structures
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
              Add Function and Beauty to Your Property
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready for custom enclosures or garden boxes? Contact us today for
              a free estimate.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-3d-white text-[oklch(0.58_0.16_90)] font-semibold text-lg px-10"
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
