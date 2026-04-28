/* Maritime Craftsman Design System - Services Hub Page
 * Overview of all services with links to detail pages
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { PageMeta } from "@/components/PageMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    title: "Roofing, Siding & Insulation",
    description:
      "GAF-certified roofing, vinyl and metal siding, and insulation. One team for your entire building envelope, fully insured with up to 50-year warranties.",
    image: "img_037a1c06ddef",
    href: "/roofing",
    featured: true,
    highlights: [
      "GAF-certified (top 5% in Canada)",
      "Up to 50-year materials warranty",
      "Free annual drone inspections",
      "Flexible financing available",
    ],
  },
  {
    title: "Decks",
    description:
      "Custom-built decks that extend your living space and enhance your outdoor enjoyment. Designed for Nova Scotia's seasons.",
    image: "deck",
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
    image: "shed",
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
    image: "fence",
    href: "/services/fences",
    highlights: [
      "Privacy options",
      "Security fencing",
      "Decorative styles",
      "Professional installation",
    ],
  },
  {
    title: "LVP Flooring",
    description:
      "Transform your home's interior with beautiful, durable luxury vinyl plank flooring. Waterproof, scratch-resistant, and available in stunning wood-look designs.",
    image: "floor",
    href: "/services/lvp-flooring",
    highlights: [
      "Waterproof & durable",
      "Realistic wood look",
      "Easy maintenance",
      "Professional installation",
    ],
  },
];

export default function Services() {
  const servicesRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      <PageMeta
        title="Our Services | Versatile Home Solutions | Annapolis Valley"
        description="Roofing, siding, insulation, custom decks, sheds, fences, and LVP flooring across the Annapolis Valley and surrounding Nova Scotia. One contractor, complete exterior solutions."
        path="/services"
      />
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            name="services-hero"
            alt=""
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover hero-zoom"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.22_0.06_250/0.88)_0%,oklch(0.22_0.06_250/0.65)_100%)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.78_0.18_88)] text-sm tracking-wider mb-4 hero-slide-down glass inline-block px-4 py-1.5 rounded-full">
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
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={servicesRef}>
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`overflow-hidden border-0 shadow-lg card-3d fade-in ${
                  service.featured ? "ring-2 ring-[oklch(0.65_0.18_88)]" : ""
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
                    <ResponsiveImage
                      name={service.image}
                      alt={`${service.title} project by Versatile Home Solutions`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                    {service.featured && (
                      <div className="absolute top-4 left-4 bg-[oklch(0.65_0.18_88)] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_88)]" />
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
                        className="border-[oklch(0.65_0.18_88)] text-[oklch(0.65_0.18_88)] hover:bg-[oklch(0.65_0.18_88)] hover:text-white"
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
      <section className="py-16 md:py-20 bg-section-navy text-white">
        <div className="container" ref={ctaRef}>
          <div className="text-center max-w-3xl mx-auto fade-in">
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
              className="bg-[oklch(0.65_0.18_88)] hover:bg-[oklch(0.58_0.18_88)] text-white font-semibold text-lg px-10 btn-3d"
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
