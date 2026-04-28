/* Maritime Craftsman Design System - Service Area Page */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const communities = [
  "Annapolis Royal",
  "Berwick",
  "Bridgetown",
  "Canning",
  "Centreville",
  "Coldbrook",
  "Digby",
  "Greenwood",
  "Hantsport",
  "Kentville",
  "Kingston",
  "Lawrencetown",
  "Middleton",
  "New Minas",
  "Port Williams",
  "Waterville",
  "Windsor",
  "Wolfville",
];

export default function ServiceArea() {
  const mainRef = useScrollReveal();
  const whyLocalRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <ResponsiveImage
            name="hero-bg"
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
              Where We Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Proudly Serving Nova Scotia
            </h1>
            <p className="text-lg text-white/80">
              Based in the Annapolis Valley, we serve homeowners throughout the
              region and surrounding Nova Scotia communities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={mainRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                The Annapolis Valley & Beyond
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p>
                  Versatile Home Solutions is proud to call Nova Scotia home.
                  We're based in the beautiful Annapolis Valley, and we serve
                  homeowners throughout the region and surrounding communities.
                </p>
                <p>
                  Our local roots mean we understand the unique challenges of
                  building in our Maritime climate. From the coastal winds to
                  the heavy snow loads, we know what it takes to build
                  structures that last in Nova Scotia. We're familiar with local
                  building codes, suppliers, and the architectural styles that
                  define our communities.
                </p>
                <p>
                  When you work with us, you're working with neighbours who care
                  about the quality of our local built environment. We take
                  pride in contributing to the homes and properties that make
                  our communities great places to live.
                </p>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <img
                  src="/images/optimized/flags-400.jpg"
                  alt="Canadian and Nova Scotia flags"
                  width={150}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-auto rounded shadow"
                />
                <div>
                  <p className="font-bold text-foreground text-lg">
                    Local & Proud
                  </p>
                  <p className="text-muted-foreground">
                    Supporting Nova Scotia homeowners
                  </p>
                </div>
              </div>

              <Card className="bg-[oklch(0.28_0.06_250)] text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Not Sure If We Serve Your Area?
                  </h3>
                  <p className="text-white/80 mb-4">
                    If you're in or near the Annapolis Valley, chances are we
                    can help. Contact us to discuss your project—we're happy to
                    let you know if we can serve your location.
                  </p>
                  <Button
                    asChild
                    className="bg-[oklch(0.65_0.18_88)] hover:bg-[oklch(0.58_0.18_88)] text-white font-semibold"
                  >
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="fade-in">
              <Card className="border-0 shadow-lg card-3d">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Communities We Serve
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Annapolis Valley & surrounding areas
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {communities.map((community) => (
                      <div
                        key={community}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-[oklch(0.65_0.18_88)] shrink-0" />
                        <span className="text-foreground">{community}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm mt-6 pt-6 border-t">
                    Don't see your community listed? We may still be able to
                    help. Contact us to discuss your project location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 md:py-24 bg-section-muted">
        <div className="container" ref={whyLocalRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
              Local Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Local Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 fade-in-stagger">
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Climate Knowledge
                </h3>
                <p className="text-muted-foreground text-sm">
                  We understand Nova Scotia's weather—the coastal storms, heavy
                  snow, and temperature swings. We build with these conditions
                  in mind.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Code Compliance
                </h3>
                <p className="text-muted-foreground text-sm">
                  We're familiar with local building codes and permit
                  requirements, ensuring your project meets all regulations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Community Investment
                </h3>
                <p className="text-muted-foreground text-sm">
                  When you hire us, you're supporting a local business that
                  reinvests in our community. We're your neighbours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-section-cedar text-white">
        <div className="container" ref={ctaRef}>
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us today to discuss your project and get a free estimate.
              We look forward to serving you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[oklch(0.65_0.18_88)] hover:bg-white/90 font-semibold text-lg px-10 btn-3d-white"
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
