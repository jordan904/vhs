/* Maritime Craftsman Design System - Metal Roofing Service Page
 * Primary money page with detailed content, FAQ, and strong CTAs
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle, Shield, Zap, Leaf, Wind } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Exceptional Durability",
    description:
      "Metal roofs can last 40-70 years with proper installation, far outlasting traditional asphalt shingles.",
  },
  {
    icon: Wind,
    title: "Weather Resistance",
    description:
      "Engineered to withstand Nova Scotia's coastal storms, heavy snow, and temperature extremes.",
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description:
      "Reflective properties help reduce cooling costs in summer and provide excellent insulation.",
  },
  {
    icon: Leaf,
    title: "Environmentally Friendly",
    description:
      "100% recyclable at end of life, and often made from recycled materials.",
  },
];

const faqs = [
  {
    question: "How long does a metal roof last?",
    answer:
      "With proper installation and minimal maintenance, a quality metal roof can last 40-70 years. This is significantly longer than traditional asphalt shingles, which typically need replacement every 15-25 years. Our installations are designed to maximize longevity in Nova Scotia's climate.",
  },
  {
    question: "Can metal roofing withstand Nova Scotia's weather?",
    answer:
      "Absolutely. Metal roofing is ideal for our Maritime climate. It's engineered to handle heavy snow loads, resist high winds (up to 140+ mph depending on the system), and won't crack or warp with temperature fluctuations. The interlocking panels shed snow and ice effectively.",
  },
  {
    question: "Is metal roofing noisy during rain?",
    answer:
      "Modern metal roofing systems, when properly installed with solid sheathing and underlayment, are no noisier than other roofing materials during rain. The insulation and attic space further dampen any sound.",
  },
  {
    question: "What colours and styles are available?",
    answer:
      "We offer a wide range of colours and profiles to complement any home style. From traditional standing seam to panels that mimic shingles, slate, or wood shake. We'll help you choose the best option for your home's architecture.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Installation time varies based on roof size and complexity. A typical residential installation takes 2-5 days. We'll provide a detailed timeline during your estimate and keep you informed throughout the process.",
  },
  {
    question: "What's included in your metal roofing service?",
    answer:
      "Our service includes a thorough inspection, removal of old roofing (if needed), installation of underlayment and flashing, professional installation of your new metal roof, cleanup, and a final walkthrough. We handle all aspects of the project.",
  },
];

const galleryImages = [
  { src: "/images/metalroof.jpg", alt: "Metal roof installation" },
  { src: "/images/metalroof1.jpg", alt: "Standing seam metal roof" },
  { src: "/images/mroof.jpg", alt: "Metal roofing detail" },
];

export default function MetalRoofing() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/metalroof.jpg"
            alt="Premium metal roofing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.06_250/0.95)] via-[oklch(0.22_0.06_250/0.85)] to-[oklch(0.22_0.06_250/0.6)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.60_0.08_60)] text-sm tracking-wider mb-4">
              Our Primary Service
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Metal Roofing Excellence
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Built to withstand Nova Scotia's demanding weather for decades.
              Our metal roofing solutions combine durability, energy efficiency,
              and lasting beauty.
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
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Choose Metal Roofing?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  Metal roofing is our specialty at Versatile Home Solutions.
                  We've seen firsthand how Nova Scotia's weather can challenge
                  traditional roofing materials—the coastal storms, heavy snow,
                  ice dams, and dramatic temperature swings. Metal roofing is
                  engineered to handle it all.
                </p>
                <p>
                  When you invest in a metal roof, you're investing in decades
                  of protection. Unlike asphalt shingles that need replacement
                  every 15-25 years, a properly installed metal roof can protect
                  your home for 40 years or more. That's not just better for
                  your wallet—it's better for the environment.
                </p>
                <p>
                  Our team brings expertise and genuine pride to every metal
                  roofing project. We use premium materials, follow
                  manufacturer specifications precisely, and ensure every detail
                  is right. Your roof is your home's first line of defence—we
                  treat it that way.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] text-white mb-4">
                        <benefit.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* What's Included */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3 mb-12">
                {[
                  "Comprehensive roof inspection and assessment",
                  "Detailed written estimate with no hidden costs",
                  "Removal and disposal of existing roofing (if needed)",
                  "Installation of premium underlayment and ice/water shield",
                  "Professional installation of your chosen metal roofing system",
                  "All necessary flashing, trim, and ventilation",
                  "Complete cleanup and debris removal",
                  "Final walkthrough and quality inspection",
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
                {/* CTA Card */}
                <Card className="bg-[oklch(0.28_0.06_250)] text-white border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Ready for a New Roof?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Get a free, no-obligation estimate for your metal roofing
                      project. We'll assess your needs and provide a detailed
                      quote.
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

                {/* Related Services */}
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Related Services
                    </h3>
                    <ul className="space-y-3">
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
            Our Metal Roofing Work
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
              Protect Your Home with Metal Roofing
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready to invest in a roof that will last for decades? Contact us
              today for a free estimate and discover why metal roofing is the
              smart choice for Nova Scotia homes.
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
