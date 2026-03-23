/* Maritime Craftsman Design System - Process Page */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, ClipboardList, Hammer, CheckSquare } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Initial Consultation",
    description:
      "It starts with a conversation. Contact us to discuss your project—whether it's a new metal roof, a deck, a shed, or any of our other services. We'll ask questions to understand your vision, timeline, and budget. This initial consultation is free and comes with no obligation.",
    details: [
      "Free, no-obligation discussion",
      "Understand your goals and needs",
      "Answer your initial questions",
      "Schedule an on-site visit if needed",
    ],
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Site Assessment & Estimate",
    description:
      "We visit your property to assess the project firsthand. We'll take measurements, evaluate conditions, and discuss options and materials. After the assessment, you'll receive a detailed written estimate that clearly outlines the scope of work, materials, timeline, and cost—no hidden fees or surprises.",
    details: [
      "On-site property assessment",
      "Detailed measurements and evaluation",
      "Material and design recommendations",
      "Clear, comprehensive written estimate",
    ],
  },
  {
    number: "03",
    icon: Hammer,
    title: "Expert Installation",
    description:
      "Once you approve the estimate, we schedule your project and get to work. Our team arrives on time, prepared, and ready to build. We maintain a clean, safe worksite and keep you informed throughout the process. Quality craftsmanship is our standard—we build it right the first time.",
    details: [
      "Scheduled start date you can count on",
      "Professional, courteous crew",
      "Clean and safe worksite",
      "Regular progress updates",
    ],
  },
  {
    number: "04",
    icon: CheckSquare,
    title: "Final Walkthrough",
    description:
      "When the work is complete, we do a thorough walkthrough with you. We'll show you the finished project, explain any maintenance requirements, and make sure everything meets your expectations. Your satisfaction is our priority—we're not done until you're happy with the result.",
    details: [
      "Complete project review together",
      "Quality inspection and verification",
      "Maintenance and care instructions",
      "Your complete satisfaction guaranteed",
    ],
  },
];

export default function Process() {
  const stepsRef = useScrollReveal();
  const apartRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[oklch(0.28_0.06_250)]">
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.72_0.16_90)] text-sm tracking-wider mb-4">
              How We Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Our Simple Process
            </h1>
            <p className="text-lg text-white/80">
              From first contact to final walkthrough, we make home improvement
              straightforward and stress-free. Here's what to expect when you
              work with Versatile Home Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={stepsRef}>
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center fade-in ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Card className="border-0 shadow-lg overflow-hidden card-3d">
                    <div className="bg-[oklch(0.28_0.06_250)] p-8 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl md:text-8xl font-bold text-white/20">
                          {step.number}
                        </span>
                        <step.icon className="h-16 w-16 text-white mx-auto -mt-8" />
                      </div>
                    </div>
                  </Card>
                </div>
                <div>
                  <p className="font-accent text-[oklch(0.58_0.16_90)] text-sm tracking-wider mb-2">
                    Step {step.number}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.58_0.16_90)]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 md:py-24 bg-section-muted">
        <div className="container" ref={apartRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <p className="font-accent text-[oklch(0.58_0.16_90)] text-sm tracking-wider mb-3">
              Our Commitment
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 fade-in-stagger">
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Clear Communication
                </h3>
                <p className="text-muted-foreground text-sm">
                  We keep you informed every step of the way. No surprises, no
                  confusion—just honest, straightforward communication.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Respect for Your Property
                </h3>
                <p className="text-muted-foreground text-sm">
                  We treat your home with care. Our crews maintain clean
                  worksites and respect your space throughout the project.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md card-3d fade-in">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Quality Guaranteed
                </h3>
                <p className="text-muted-foreground text-sm">
                  We stand behind our work. If something isn't right, we make it
                  right. Your satisfaction is our measure of success.
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
              Ready to Get Started?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              The first step is easy—just reach out. We'll discuss your project
              and schedule a free estimate at your convenience.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[oklch(0.58_0.16_90)] hover:bg-white/90 font-semibold text-lg px-10 btn-3d-white"
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
