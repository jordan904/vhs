/* Maritime Craftsman Design System - Decks Service Page */

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

const faqs = [
  {
    question: "What materials do you use for decks?",
    answer:
      "We work with a variety of materials including pressure-treated lumber, cedar, and composite decking. Each has its advantages, and we'll help you choose the best option based on your budget, maintenance preferences, and aesthetic goals.",
  },
  {
    question: "How long does deck construction take?",
    answer:
      "A typical deck project takes 1-2 weeks depending on size and complexity. We'll provide a detailed timeline during your estimate and keep you informed throughout the build.",
  },
  {
    question: "Do I need a permit for a deck?",
    answer:
      "Most deck projects require a building permit. We handle the permit process as part of our service, ensuring your deck meets all local building codes and regulations.",
  },
  {
    question: "How do I maintain my new deck?",
    answer:
      "Maintenance depends on the material. Pressure-treated and cedar decks benefit from annual cleaning and periodic staining/sealing. Composite decks require less maintenance—typically just regular cleaning. We'll provide specific care instructions for your deck.",
  },
  {
    question: "Can you build multi-level or covered decks?",
    answer:
      "Absolutely. We design and build decks of all types, from simple single-level platforms to elaborate multi-level designs with built-in seating, pergolas, and privacy screens. We'll work with you to create the perfect outdoor space.",
  },
];

const galleryImages = [
  { src: "/images/deck.jpg", alt: "Custom deck construction" },
  { src: "/images/pergola.jpg", alt: "Deck with pergola" },
  { src: "/images/patio.jpg", alt: "Outdoor living space" },
];

export default function Decks() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/deck.jpg"
            alt="Custom deck construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.06_250/0.95)] via-[oklch(0.22_0.06_250/0.85)] to-[oklch(0.22_0.06_250/0.6)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.60_0.08_60)] text-sm tracking-wider mb-4">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Custom Deck Construction
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Extend your living space with a beautifully crafted deck designed
              for Nova Scotia's seasons. From simple platforms to elaborate
              outdoor living areas.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold"
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Your Perfect Outdoor Space
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  A well-designed deck transforms how you use your home. It's
                  where morning coffee tastes better, where summer barbecues
                  happen, and where you can enjoy Nova Scotia's beautiful
                  seasons in comfort. At Versatile Home Solutions, we build
                  decks that become the heart of your outdoor living.
                </p>
                <p>
                  Every deck we build starts with understanding how you want to
                  use the space. Do you need room for entertaining? A quiet
                  retreat? Space for the kids to play? We design with your
                  lifestyle in mind, then build with the quality craftsmanship
                  that ensures your deck will serve you well for years to come.
                </p>
                <p>
                  We use quality materials suited to our Maritime climate and
                  build to code, ensuring your deck is safe, durable, and built
                  to last. From the foundation to the finishing touches, we
                  handle every detail.
                </p>
              </div>

              {/* What's Included */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3 mb-12">
                {[
                  "Custom design consultation",
                  "Site assessment and planning",
                  "Permit acquisition (where required)",
                  "Quality materials and hardware",
                  "Professional construction to code",
                  "Railings, stairs, and safety features",
                  "Complete cleanup",
                  "Final walkthrough and care instructions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.50_0.10_60)] shrink-0 mt-0.5" />
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
                      Ready for Your New Deck?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free estimate for your deck project. We'll discuss
                      your vision and provide a detailed quote.
                    </p>
                    <Button
                      asChild
                      className="w-full bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold"
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
                          className="text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.50_0.10_60)] transition-colors"
                        >
                          Fences →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/sheds-outbuildings"
                          className="text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.50_0.10_60)] transition-colors"
                        >
                          Sheds & Outbuildings →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.50_0.10_60)] transition-colors"
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
      <section className="py-12 bg-muted">
        <div className="container">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Our Deck Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-lg group"
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
      <section className="py-16 md:py-20 bg-[oklch(0.50_0.10_60)] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expand Your Living Space
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready to enjoy the outdoors from the comfort of your own custom
              deck? Contact us today for a free estimate.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[oklch(0.50_0.10_60)] hover:bg-white/90 font-semibold text-lg px-10"
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
