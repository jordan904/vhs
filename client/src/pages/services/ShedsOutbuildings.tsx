/* Maritime Craftsman Design System - Sheds & Outbuildings Service Page */

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
    question: "What sizes of sheds do you build?",
    answer:
      "We build sheds and outbuildings in a wide range of sizes, from compact garden sheds to large workshops. We'll work with you to determine the right size based on your needs and property constraints.",
  },
  {
    question: "Do sheds require permits?",
    answer:
      "Permit requirements vary by municipality and shed size. Generally, smaller sheds may not require permits, while larger structures do. We'll help you navigate the permit process and ensure your outbuilding meets all local requirements.",
  },
  {
    question: "Can you match my shed to my home's style?",
    answer:
      "Absolutely. We can design your shed or outbuilding to complement your home's architecture, using similar siding, roofing, and trim details. This creates a cohesive look across your property.",
  },
  {
    question: "What roofing options are available for sheds?",
    answer:
      "We offer various roofing options including metal roofing (our specialty), asphalt shingles, and other materials. Metal roofing is an excellent choice for outbuildings due to its durability and low maintenance.",
  },
  {
    question: "Can you add electricity or insulation?",
    answer:
      "Yes, we can build sheds with provisions for electrical service and insulation. This is especially useful for workshops or sheds that will be used year-round. We'll coordinate with licensed electricians as needed.",
  },
];

const galleryImages = [
  { src: "/images/shed.jpg", alt: "Custom shed construction" },
  { src: "/images/greenhouse.jpg", alt: "Greenhouse structure" },
  { src: "/images/catio.jpg", alt: "Custom catio enclosure" },
  { src: "/images/catio1.jpg", alt: "Catio outdoor cat enclosure" },
];

export default function ShedsOutbuildings() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/shed.jpg"
            alt="Custom shed construction"
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
              Sheds & Outbuildings
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Quality storage solutions and outbuildings tailored to your
              property's needs. From garden sheds to workshops, built to last.
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
                Storage Solutions That Last
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  Every property has storage needs. Whether you need a place for
                  garden tools, a workshop for your hobbies, or a dedicated
                  space for equipment, a well-built outbuilding adds both
                  function and value to your property.
                </p>
                <p>
                  At Versatile Home Solutions, we build sheds and outbuildings
                  that are more than just storage—they're structures built with
                  the same care and quality we bring to every project. We use
                  durable materials suited to Nova Scotia's climate and
                  construct to standards that ensure your outbuilding will serve
                  you well for years.
                </p>
                <p>
                  From simple garden sheds to custom workshops, greenhouses, and
                  specialty structures like catios, we work with you to design
                  and build exactly what you need.
                </p>
              </div>

              {/* What's Included */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3 mb-12">
                {[
                  "Custom design consultation",
                  "Site preparation and foundation",
                  "Quality framing and construction",
                  "Durable siding and roofing",
                  "Doors, windows, and hardware",
                  "Optional: electrical prep, insulation, shelving",
                  "Complete cleanup",
                  "Final walkthrough",
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
                      Need Storage Space?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free estimate for your shed or outbuilding project.
                      We'll help you design the perfect solution.
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
                          href="/services/metal-roofing"
                          className="text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.50_0.10_60)] transition-colors"
                        >
                          Metal Roofing →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/garbage-bins-garden-boxes"
                          className="text-[oklch(0.28_0.06_250)] hover:text-[oklch(0.50_0.10_60)] transition-colors"
                        >
                          Garden Boxes →
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
            Our Outbuilding Work
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
              Build Your Perfect Outbuilding
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready to add functional storage or workspace to your property?
              Contact us today for a free estimate.
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
