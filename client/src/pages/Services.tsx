/* Maritime Craftsman Design System - Services Hub Page
 * Overview of all services with links to detail pages
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

const services = [
  {
    title: "Metal Roofing",
    description:
      "Our specialty. Durable, weather-resistant metal roofing built to withstand Nova Scotia's harshest conditions for 40+ years.",
    image: "/images/metalroof.jpg",
    href: "/services/metal-roofing",
    featured: true,
    highlights: [
      "40+ year lifespan",
      "Superior weather resistance",
      "Energy efficient",
      "Low maintenance",
    ],
  },
  {
    title: "Decks",
    description:
      "Custom-built decks that extend your living space and enhance your outdoor enjoyment. Designed for Nova Scotia's seasons.",
    image: "/images/deck.jpg",
    href: "/services/decks",
    highlights: [
      "Custom designs",
      "Quality materials",
      "Built to code",
      "Weather-resistant",
    ],
  },
  {
    title: "Sheds & Outbuildings",
    description:
      "Quality storage solutions and outbuildings tailored to your property's needs. From garden sheds to workshops.",
    image: "/images/shed.jpg",
    href: "/services/sheds-outbuildings",
    highlights: [
      "Custom sizes",
      "Durable construction",
      "Various styles",
      "Practical design",
    ],
  },
  {
    title: "Fences",
    description:
      "Privacy, security, and curb appeal with expertly installed fencing solutions. Multiple styles and materials available.",
    image: "/images/fence.jpg",
    href: "/services/fences",
    highlights: [
      "Privacy options",
      "Security fencing",
      "Decorative styles",
      "Professional installation",
    ],
  },
  {
    title: "Greenhouses, Garbage Bin Enclosures & Garden Boxes",
    description:
      "Custom greenhouses, enclosures, and garden structures that blend function with aesthetics. Keep your property tidy and beautiful.",
    image: "/images/greenhouse.jpg",
    href: "/services/garbage-bins-garden-boxes",
    highlights: [
      "Custom designs",
      "Interior/exterior options",
      "Durable materials",
      "Aesthetic appeal",
    ],
  },
];

export default function Services() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/services-hero.jpg"
            alt="Metal roofing detail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.06_250/0.95)] via-[oklch(0.22_0.06_250/0.85)] to-[oklch(0.22_0.06_250/0.7)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.60_0.08_60)] text-sm tracking-wider mb-4">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Complete Exterior Solutions
            </h1>
            <p className="text-lg text-white/80">
              From roofing to fencing, we provide comprehensive exterior
              services to transform and protect your home. Quality craftsmanship
              on every project.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`overflow-hidden border-0 shadow-lg ${
                  service.featured ? "ring-2 ring-[oklch(0.50_0.10_60)]" : ""
                }`}
              >
                <div
                  className={`grid lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div
                    className={`relative h-64 lg:h-auto ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    {service.featured && (
                      <div className="absolute top-4 left-4 bg-[oklch(0.50_0.10_60)] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        Primary Service
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2 mb-8">
                      {service.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.50_0.10_60)]" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        className="bg-[oklch(0.28_0.06_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold"
                      >
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-[oklch(0.50_0.10_60)] text-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.50_0.10_60)] hover:text-white"
                      >
                        <Link href="/contact">Get a Quote</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-16 md:py-20 bg-[oklch(0.28_0.06_250)] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us for a free consultation. We'll assess your property and
              recommend the best solutions for your needs and budget.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold text-lg px-10"
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
