/* Maritime Craftsman Design System - Home Page
 * Hero with diagonal dividers, services grid, trust elements
 * Conversion-focused with prominent CTAs
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    title: "Metal Roofing",
    description:
      "Durable, weather-resistant metal roofing built to withstand Nova Scotia's harshest conditions.",
    image: "/images/metalroof.jpg",
    href: "/services/metal-roofing",
    featured: true,
  },
  {
    title: "Decks",
    description:
      "Custom-built decks that extend your living space and enhance your outdoor enjoyment.",
    image: "/images/deck.jpg",
    href: "/services/decks",
  },
  {
    title: "Sheds & Outbuildings",
    description:
      "Quality storage solutions and outbuildings tailored to your property's needs.",
    image: "/images/shed.jpg",
    href: "/services/sheds-outbuildings",
  },
  {
    title: "Fences",
    description:
      "Privacy, security, and curb appeal with expertly installed fencing solutions.",
    image: "/images/fence.jpg",
    href: "/services/fences",
  },
  {
    title: "Greenhouses, Garbage Bins & Garden Boxes",
    description:
      "Custom greenhouses, enclosures, and garden structures that blend function with aesthetics.",
    image: "/images/greenhouse.jpg",
    href: "/services/garbage-bins-garden-boxes",
  },
];

const whyChoose = [
  {
    icon: Shield,
    title: "Quality Craftsmanship",
    description:
      "Every project is built with attention to detail and pride in our work.",
  },
  {
    icon: Award,
    title: "Local Expertise",
    description:
      "We understand Nova Scotia's climate and building requirements.",
  },
  {
    icon: Users,
    title: "Customer-Focused",
    description:
      "Your vision drives every decision. We listen, plan, and deliver.",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description:
      "Clear communication and timelines you can count on from start to finish.",
  },
];

const processSteps = [
  { step: "1", title: "Initial Consultation", description: "We discuss your vision and assess your project needs." },
  { step: "2", title: "Detailed Estimate", description: "Receive a comprehensive, transparent quote." },
  { step: "3", title: "Expert Installation", description: "Our skilled team brings your project to life." },
  { step: "4", title: "Final Walkthrough", description: "We ensure everything meets your expectations." },
];

const galleryImages = [
  { src: "/images/metalroof1.jpg", alt: "Metal roofing project" },
  { src: "/images/fence1.jpg", alt: "Fence installation" },
  { src: "/images/pergola.jpg", alt: "Pergola construction" },
  { src: "/images/catio.jpg", alt: "Catio project" },
  { src: "/images/mroof.jpg", alt: "Metal roof detail" },
  { src: "/images/patio.jpg", alt: "Patio project" },
];

export default function Home() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Nova Scotia countryside"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.06_250/0.95)] via-[oklch(0.22_0.06_250/0.8)] to-[oklch(0.22_0.06_250/0.6)]" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.60_0.08_60)] text-sm tracking-wider mb-4">
              Nova Scotia's Trusted Home Improvement Experts
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Transform Your Home with Expert Craftsmanship
            </h1>
            <p className="text-xl md:text-2xl text-white/90 italic mb-2">
              "Your Vision Is Our Priority"
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              From premium metal roofing to custom decks, sheds, and fences—we
              bring quality construction to homeowners across the Annapolis
              Valley and surrounding Nova Scotia communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold text-lg px-8"
              >
                <Link href="/contact">
                  Request a Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold text-lg px-8"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Diagonal Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* Primary Service Spotlight - Metal Roofing */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
                Our Primary Service
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Metal Roofing Excellence
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Metal roofing is our specialty. Built to withstand Nova Scotia's
                demanding weather—from coastal storms to heavy snow loads—our
                metal roofs provide decades of protection with minimal
                maintenance. Energy-efficient, fire-resistant, and available in
                a variety of styles and colours to complement your home.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "40+ year lifespan with proper installation",
                  "Superior wind and weather resistance",
                  "Energy-efficient reflective properties",
                  "Low maintenance requirements",
                  "Environmentally friendly and recyclable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.50_0.10_60)] shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-[oklch(0.28_0.06_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold"
                >
                  <Link href="/services/metal-roofing">
                    Learn More About Metal Roofing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[oklch(0.50_0.10_60)] text-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.50_0.10_60)] hover:text-white"
                >
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="/images/metalroof.jpg"
                  alt="Premium metal roofing installation"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-[oklch(0.28_0.06_250)] text-white p-4 rounded-lg shadow-lg">
                  <p className="font-accent text-sm">Built for</p>
                  <p className="text-2xl font-bold">40+ Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-muted diagonal-top">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Exterior Solutions
            </h2>
            <p className="text-muted-foreground text-lg">
              From roofing to fencing, we provide comprehensive exterior
              services to transform and protect your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.title}
                className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  service.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-[oklch(0.28_0.06_250)] font-semibold hover:text-[oklch(0.50_0.10_60)] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold"
            >
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Versatile Home Solutions
            </h2>
            <p className="text-muted-foreground text-lg">
              We're committed to delivering exceptional results on every
              project, backed by local expertise and genuine care for our
              customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[oklch(0.28_0.06_250)] text-white mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="py-16 md:py-24 bg-[oklch(0.28_0.06_250)] text-white diagonal-top">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-[oklch(0.60_0.08_60)] text-sm tracking-wider mb-3">
              How We Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Simple Process
            </h2>
            <p className="text-white/80 text-lg">
              From first contact to final walkthrough, we make home improvement
              straightforward and stress-free.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="text-4xl font-bold text-[oklch(0.60_0.08_60)] mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[oklch(0.50_0.10_60)] hover:bg-[oklch(0.45_0.10_60)] text-white font-semibold"
            >
              <Link href="/process">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Area Teaser */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
                Where We Work
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Proudly Serving Nova Scotia
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Based in the Annapolis Valley, we serve homeowners throughout
                the region and surrounding Nova Scotia communities. Our local
                expertise means we understand the unique challenges of building
                in our Maritime climate.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/flags.jpeg"
                  alt="Canadian and Nova Scotia flags"
                  className="h-16 w-auto rounded"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    Local & Proud
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Serving Nova Scotia homeowners
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-[oklch(0.28_0.06_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold"
              >
                <Link href="/service-area">
                  View Our Service Area
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/images/contact-hero.jpg"
                alt="Nova Scotia home with metal roof"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
              Our Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recent Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              See the quality and craftsmanship we bring to every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[oklch(0.28_0.06_250/0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-accent text-[oklch(0.50_0.10_60)] text-sm tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're proud of the relationships we build with our customers.
              Testimonials coming soon.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 border-dashed border-2">
                  <div className="text-center text-muted-foreground">
                    <p className="italic mb-4">
                      "Customer testimonial placeholder"
                    </p>
                    <p className="font-semibold">— Customer Name</p>
                    <p className="text-sm">Location, NS</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-16 md:py-20 bg-[oklch(0.50_0.10_60)] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get started with a free, no-obligation estimate. We'll discuss
              your project, answer your questions, and provide a detailed quote.
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
