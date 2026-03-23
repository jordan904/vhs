/* Maritime Craftsman Design System - Contact Page
 * Estimate request form with all required fields
 */

import { useState } from "react";
import { Link } from "wouter";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  { value: "metal-roofing", label: "Metal Roofing" },
  { value: "decks", label: "Decks" },
  { value: "sheds-outbuildings", label: "Sheds & Outbuildings" },
  { value: "fences", label: "Fences" },
  { value: "garbage-bins", label: "Garbage Bin Enclosures" },
  { value: "garden-boxes", label: "Garden Boxes" },
  { value: "other", label: "Other" },
];

const timeframes = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1\u20133 months" },
  { value: "3-6-months", label: "3\u20136 months" },
  { value: "planning", label: "Planning ahead" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    description: "",
    timeframe: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address or town";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please describe your project";
    }

    if (!formData.timeframe) {
      newErrors.timeframe = "Please select a timeframe";
    }

    if (!formData.consent) {
      newErrors.consent = "Please agree to be contacted about your estimate";
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
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service: formData.service,
          timeframe: formData.timeframe,
          message: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
      window.scrollTo(0, 0);
      toast.success("Your estimate request has been submitted!");
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0">
            <img
              src="/images/contact-hero.jpg"
              alt="Nova Scotia home"
              className="w-full h-full object-cover hero-zoom"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.22_0.06_250/0.88)_0%,oklch(0.22_0.06_250/0.65)_100%)]" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <p className="font-accent text-[oklch(0.72_0.16_90)] text-sm tracking-wider mb-4 hero-slide-down glass inline-block px-4 py-1.5 rounded-full">
                Thank You
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Request Received!
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
                We've Received Your Estimate Request
              </h2>
              <p className="text-[oklch(0.58_0.16_90)] text-xl font-semibold mb-4">
                We will be in touch shortly!
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for contacting Versatile Home Solutions. We'll review
                your project details and reach out within 1-2 business days to
                schedule your measurement and discuss next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-[oklch(0.28_0.06_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold btn-3d-inverted"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[oklch(0.58_0.16_90)] text-[oklch(0.58_0.16_90)] hover:bg-[oklch(0.58_0.16_90)] hover:text-white"
                >
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/contact-hero.jpg"
            alt="Nova Scotia home"
            className="w-full h-full object-cover hero-zoom"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.22_0.06_250/0.88)_0%,oklch(0.22_0.06_250/0.65)_100%)]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="font-accent text-[oklch(0.72_0.16_90)] text-sm tracking-wider mb-4 hero-slide-down glass inline-block px-4 py-1.5 rounded-full">
              Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Request a Free Estimate
            </h1>
            <p className="text-lg text-white/80">
              Ready to start your project? Fill out the form below and we'll get
              back to you within 1-2 business days to discuss your needs and
              schedule a site visit.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-section-light">
        <div className="container" ref={formRef}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 fade-in">
              <Card className="border-0 shadow-lg card-3d">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Estimate Request Form
                  </h2>
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
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
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
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="(902) 555-1234"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Address / Town <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Your address or town name"
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      )}
                    </div>

                    {/* Service & Timeframe */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          Service Interested In{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.service ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                              >
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-red-500 text-sm">
                            {errors.service}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>
                          Ideal Timeframe{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.timeframe}
                          onValueChange={(value) =>
                            handleInputChange("timeframe", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.timeframe ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeframes.map((tf) => (
                              <SelectItem key={tf.value} value={tf.value}>
                                {tf.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.timeframe && (
                          <p className="text-red-500 text-sm">
                            {errors.timeframe}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Project Description{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Please describe your project, including any specific requirements or questions you have..."
                        rows={5}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* File Upload (Optional) */}
                    <div className="space-y-2">
                      <Label htmlFor="photos">Upload Photos (Optional)</Label>
                      <Input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        className="cursor-pointer"
                      />
                      <p className="text-muted-foreground text-sm">
                        Photos help us understand your project better. You can
                        upload multiple images.
                      </p>
                    </div>

                    {/* Consent */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) =>
                            handleInputChange("consent", checked as boolean)
                          }
                          className={errors.consent ? "border-red-500" : ""}
                        />
                        <Label
                          htmlFor="consent"
                          className="text-sm leading-relaxed cursor-pointer"
                        >
                          I agree to be contacted about my estimate request.{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      {errors.consent && (
                        <p className="text-red-500 text-sm">{errors.consent}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[oklch(0.58_0.16_90)] hover:bg-[oklch(0.52_0.16_90)] text-white font-semibold btn-3d"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Request a Free Estimate
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 fade-in">
              <div className="sticky top-24 space-y-6">
                {/* Contact Info */}
                <Card className="border-0 shadow-md card-3d-light">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 hover-slide-right">
                        <MapPin className="h-5 w-5 text-[oklch(0.58_0.16_90)] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">
                            Versatile Home Solutions
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Annapolis Valley & Surrounding
                            <br />
                            Nova Scotia Communities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 hover-slide-right">
                        <Phone className="h-5 w-5 text-[oklch(0.58_0.16_90)] shrink-0" />
                        <a
                          href="tel:+19028245333"
                          className="text-foreground hover:text-[oklch(0.58_0.16_90)] transition-colors"
                        >
                          (902) 824-5333
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What Happens Next */}
                <Card className="border-0 shadow-md card-3d-light">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      What Happens Next?
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.28_0.06_250)] text-white text-sm flex items-center justify-center shrink-0">
                          1
                        </span>
                        <p className="text-muted-foreground text-sm">
                          We review your request and reach out within 1-2
                          business days.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.28_0.06_250)] text-white text-sm flex items-center justify-center shrink-0">
                          2
                        </span>
                        <p className="text-muted-foreground text-sm">
                          We schedule a convenient time to visit your property
                          and take measurements.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.28_0.06_250)] text-white text-sm flex items-center justify-center shrink-0">
                          3
                        </span>
                        <p className="text-muted-foreground text-sm">
                          You receive a detailed written estimate with no
                          obligation.
                        </p>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
