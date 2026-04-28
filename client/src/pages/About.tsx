/* Maritime Craftsman Design System - About Page
 * Company story, values, and local commitment
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, MapPin, Wrench } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "We never cut corners. Every project is built to last, using premium materials and proven techniques.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description:
      "Your satisfaction is our priority. We listen, communicate clearly, and stand behind our work.",
  },
  {
    icon: MapPin,
    title: "Local Roots",
    description:
      "As Nova Scotians ourselves, we understand the unique needs of homes in our Maritime climate.",
  },
  {
    icon: Wrench,
    title: "Skilled Craftsmanship",
    description:
      "Our team brings years of experience and genuine pride to every project we undertake.",
  },
];

export default function About() {
  const storyRef = useScrollReveal();
  const valuesRef = useScrollReveal();
  const commitmentRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            name="about-hero"
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
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Building Trust, One Project at a Time
            </h1>
            <p className="text-lg text-white/80">
              Versatile Home Solutions is a locally owned and operated home
              improvement company serving the Annapolis Valley and surrounding
              Nova Scotia communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={storyRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Vision Is Our Priority
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Versatile Home Solutions was founded with a simple belief:
                  every homeowner deserves quality craftsmanship, honest
                  communication, and fair pricing. We're not a big corporation
                  with layers of management—we're local tradespeople who take
                  pride in our work and treat every project as if it were our
                  own home.
                </p>
                <p>
                  Our specialty is metal roofing, a product we believe in
                  wholeheartedly for Nova Scotia's demanding climate. But we
                  also bring the same level of care and expertise to decks,
                  sheds, fences, and other exterior projects. Whatever your
                  vision, we're here to make it a reality.
                </p>
                <p>
                  When you work with us, you're not just hiring a contractor—
                  you're partnering with neighbours who understand the unique
                  challenges of building in our Maritime environment and who
                  genuinely care about the outcome.
                </p>
              </div>
            </div>
            <div className="relative fade-in">
              <div className="overflow-hidden rounded-lg shadow-xl">
                <ResponsiveImage
                  name="insulation"
                  alt="Insulation installation in a Nova Scotia home"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto about-image-zoom"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[oklch(0.65_0.18_88)] text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="font-bold text-lg mb-1">Local Expertise</p>
                <p className="text-white/80 text-sm">
                  Built for Nova Scotia's climate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-section-muted">
        <div className="container" ref={valuesRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles guide everything we do, from the first phone call
              to the final walkthrough.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-stagger">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card p-6 rounded-lg border border-border card-3d fade-in"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] text-white mb-4 icon-pop">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Commitment */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={commitmentRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 fade-in">
              <img
                src="/images/optimized/flags-400.jpg"
                alt="Canadian and Nova Scotia flags"
                width={400}
                height={300}
                loading="lazy"
                decoding="async"
                className="w-full max-w-md h-auto rounded-lg shadow-xl mx-auto"
              />
            </div>
            <div className="order-1 lg:order-2 fade-in">
              <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
                Local & Proud
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Committed to Our Community
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We're proud to call Nova Scotia home. Our roots in the
                  Annapolis Valley mean we understand the local building codes,
                  weather patterns, and architectural styles that make our
                  region unique.
                </p>
                <p>
                  When you choose Versatile Home Solutions, you're supporting a
                  local business that reinvests in our community. We source
                  materials locally when possible and build relationships with
                  our customers that last long after the project is complete.
                </p>
              </div>
              <div className="mt-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-section-cedar text-white">
        <div className="container" ref={ctaRef}>
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Ready to discuss your project? We'd love to hear about your vision
              and show you how we can help make it a reality.
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
