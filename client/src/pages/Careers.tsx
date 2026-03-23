/* Maritime Craftsman Design System - Careers Page
 * Job listings and application form
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import {
  Briefcase,
  Users,
  TrendingUp,
  Heart,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Pay",
    description:
      "We offer fair wages that reflect your skills and experience, with regular performance reviews.",
  },
  {
    icon: Clock,
    title: "Year-Round Work",
    description:
      "Enjoy stable, consistent employment throughout the year. No seasonal layoffs for full-time crew.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunity",
    description:
      "Build your skills on the job and advance your career. We invest in our team's professional development.",
  },
  {
    icon: Heart,
    title: "Great Team Culture",
    description:
      "Join a supportive crew that takes pride in quality work and treats every team member with respect.",
  },
];

const positions = [
  {
    id: "foreman",
    title: "Foreman",
    type: "Full-time, Year-round",
    description:
      "Lead and oversee crews on job sites across the Annapolis Valley. You will coordinate project timelines, manage materials, and ensure quality standards are met on every build.",
    requirements: [
      "Experience in metal roofing, deck construction, fencing, or general exterior construction",
      "Strong leadership and communication skills",
      "Ability to coordinate project timelines, materials, and quality standards",
      "Valid driver's license",
      "Based in or willing to commute to the Annapolis Valley, Nova Scotia",
    ],
  },
  {
    id: "skilled-labourer",
    title: "Skilled Labourer",
    type: "Full-time and Seasonal positions available",
    description:
      "Perform hands-on construction work across all of our services. You will work alongside experienced crew members on a variety of exterior and interior projects.",
    requirements: [
      "Experience in one or more of: metal roofing, decks, sheds/outbuildings, fences, LVP flooring",
      "Ability to work outdoors in all weather conditions",
      "Reliable transportation",
      "Strong work ethic and willingness to learn",
      "Based in or willing to commute to the Annapolis Valley, Nova Scotia",
    ],
  },
];

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefitsRef = useScrollReveal();
  const listingsRef = useScrollReveal();
  const formRef = useScrollReveal();
  const successRef = useScrollReveal();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }

    if (!formData.position) {
      newErrors.position = "Please select a position";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your experience";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/mgonjzkv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Job Application: ${formData.position}`,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
      window.scrollTo(0, 0);
      toast.success("Your application has been submitted!");
    } catch {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-bg.jpg"
              alt="Construction team at work"
              className="w-full h-full object-cover hero-zoom"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.22_0.06_250/0.88)_0%,oklch(0.22_0.06_250/0.65)_100%)]" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <p className="font-accent text-[oklch(0.78_0.18_88)] text-sm tracking-wider mb-4 hero-slide-down glass inline-block px-4 py-1.5 rounded-full">
                Thank You
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Application Received!
              </h1>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <section className="py-16 md:py-24 bg-section-light">
          <div className="container" ref={successRef}>
            <div className="max-w-2xl mx-auto text-center fade-in">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                We've Received Your Application
              </h2>
              <p className="text-[oklch(0.65_0.18_88)] text-xl font-semibold mb-4">
                We will be in touch shortly!
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for your interest in joining Versatile Home Solutions.
                We'll review your application and reach out within a few
                business days to discuss next steps.
              </p>
              <Button
                asChild
                className="bg-[oklch(0.28_0.06_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold btn-3d-inverted"
              >
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Construction team at work"
            className="w-full h-full object-cover hero-zoom"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.22_0.06_250/0.88)_0%,oklch(0.22_0.06_250/0.65)_100%)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.78_0.18_88)] text-sm tracking-wider mb-4 hero-slide-down glass inline-block px-4 py-1.5 rounded-full">
              Join Our Team
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Build Your Career with Us
            </h1>
            <p className="text-lg text-white/80">
              We're looking for skilled, motivated people to join the Versatile
              Home Solutions crew. If you take pride in quality work and want to
              grow with a local company, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={benefitsRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
              Why Work With Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              More Than Just a Job
            </h2>
            <p className="text-muted-foreground text-lg">
              At Versatile Home Solutions, we believe in taking care of our team
              the same way we take care of our customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-stagger">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-6 rounded-lg border border-border card-3d fade-in"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] text-white mb-4 icon-pop">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-section-muted">
        <div className="container" ref={listingsRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
            <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Current Opportunities
            </h2>
            <p className="text-muted-foreground text-lg">
              We're actively hiring for the following roles. Find the right fit
              and apply today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto fade-in-stagger">
            {positions.map((position) => (
              <Card
                key={position.id}
                className="border-0 shadow-lg card-3d fade-in"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.28_0.06_250)] text-white shrink-0 icon-pop">
                      {position.id === "foreman" ? (
                        <Users className="h-6 w-6" />
                      ) : (
                        <Briefcase className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {position.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-sm text-[oklch(0.65_0.18_88)] font-medium">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Annapolis Valley, Nova Scotia
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-5">
                    {position.description}
                  </p>

                  <h4 className="font-semibold text-foreground mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {position.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-[oklch(0.65_0.18_88)] shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-[oklch(0.65_0.18_88)] hover:bg-[oklch(0.58_0.18_88)] text-white font-semibold btn-3d"
                    onClick={() => {
                      handleInputChange("position", position.title);
                      document
                        .getElementById("apply")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-section-light scroll-mt-24">
        <div className="container" ref={formRef}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 fade-in">
              <p className="font-accent text-[oklch(0.65_0.18_88)] text-sm tracking-wider mb-3">
                Apply Now
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Submit Your Application
              </h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and we'll get back to you soon. We look
                forward to learning more about you.
              </p>
            </div>

            <Card className="border-0 shadow-lg card-3d fade-in">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Your full name"
                      autoComplete="name"
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        autoComplete="email"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="(902) 555-1234"
                        autoComplete="tel"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <Label>
                      Position <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) =>
                        handleInputChange("position", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.position ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Foreman">Foreman</SelectItem>
                        <SelectItem value="Skilled Labourer">
                          Skilled Labourer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.position && (
                      <p className="text-red-500 text-sm">{errors.position}</p>
                    )}
                  </div>

                  {/* Experience / Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Experience / Message{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your relevant experience, skills, and why you'd like to join our team..."
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>

                  {/* Honeypot */}
                  <div
                    style={{ position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  >
                    <Input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[oklch(0.65_0.18_88)] hover:bg-[oklch(0.58_0.18_88)] text-white font-semibold btn-3d"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-section-cedar text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have Questions About Working With Us?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Give us a call. We're happy to chat about what it's like to be part
              of the Versatile Home Solutions team.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[oklch(0.65_0.18_88)] hover:bg-white/90 font-semibold text-lg px-10 btn-3d-white"
            >
              <a href="tel:+19028245333">
                Call (902) 824-5333
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
