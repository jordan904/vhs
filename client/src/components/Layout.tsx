/* Maritime Craftsman Design System
 * Layout wrapper with persistent header and footer
 * Deep Navy header, warm footer with NAP block
 * Premium animations: rAF scroll, nav underlines, footer micro-interactions
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

const services = [
  { name: "Roofing, Siding & Insulation", href: "/roofing" },
  { name: "Decks", href: "/services/decks" },
  { name: "Sheds & Outbuildings", href: "/services/sheds-outbuildings" },
  { name: "Fences", href: "/services/fences" },
  { name: "LVP Flooring", href: "/services/lvp-flooring" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Our Process", href: "/process" },
  { name: "Service Area", href: "/service-area" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const rafRef = useRef<number>(0);

  // Navbar scroll with requestAnimationFrame + passive listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.28_0.06_250)] shadow-lg shadow-[oklch(0.22_0.06_250/0.3)]"
            : "bg-[oklch(0.28_0.06_250/0.95)]"
        }`}
      >
        <nav className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/images/optimized/VHS_Logo-800.jpg"
                alt="Versatile Home Solutions logo"
                width={48}
                height={48}
                fetchPriority="high"
                decoding="async"
                className="h-10 md:h-12 w-auto rounded"
              />
              <div className="hidden sm:block">
                <span className="text-white font-semibold text-lg leading-tight block">
                  Versatile Home Solutions
                </span>
                <span className="text-white/70 text-xs italic">
                  Your Vision Is Our Priority
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`nav-link-premium px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                          location.startsWith("/services")
                            ? "text-white bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link href="/services" className="w-full font-medium">
                          All Services
                        </Link>
                      </DropdownMenuItem>
                      {services.map((service) => (
                        <DropdownMenuItem key={service.href} asChild>
                          <Link href={service.href} className="w-full">
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`nav-link-premium px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      location === link.href
                        ? "text-white bg-white/10 active"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA Button - 3D with pulse */}
            <div className="hidden md:block">
              <Button
                asChild
                className="btn-3d nav-cta-pulse text-white font-semibold rounded-full px-6"
              >
                <Link href="/contact">Request a Free Estimate</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-white/10 mt-2 pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.name}>
                      <Link
                        href="/services"
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                          location === "/services"
                            ? "text-white bg-white/10"
                            : "text-white/80"
                        }`}
                      >
                        All Services
                      </Link>
                      <div className="ml-4 border-l border-white/20 pl-3 mt-1">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`block px-3 py-2 text-sm rounded-md ${
                              location === service.href
                                ? "text-white bg-white/10"
                                : "text-white/70"
                            }`}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block px-3 py-2 text-sm font-medium rounded-md ${
                        location === link.href
                          ? "text-white bg-white/10"
                          : "text-white/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                )}
                <div className="mt-4 px-3">
                  <Button
                    asChild
                    className="w-full btn-3d text-white font-semibold"
                  >
                    <Link href="/contact">Request a Free Estimate</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-section-footer text-white">
        {/* Main Footer */}
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img
                  src="/images/optimized/VHS_Logo-800.jpg"
                  alt="Versatile Home Solutions logo"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto rounded"
                />
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Roofing, siding, insulation, decks, sheds, fences, and exterior
                projects for homeowners from Windsor to Digby.
              </p>
              <p className="text-[oklch(0.78_0.18_88)] font-medium italic">
                "Your Vision Is Our Priority"
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="hover-slide-right-sm inline-block text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover-slide-right-sm inline-block text-white/70 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process"
                    className="hover-slide-right-sm inline-block text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service-area"
                    className="hover-slide-right-sm inline-block text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Service Area
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover-slide-right-sm inline-block text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* NAP Block - Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="hover-slide-right flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[oklch(0.78_0.18_88)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      Versatile Home Solutions
                    </p>
                    <p className="text-white/70 text-sm">
                      Annapolis Valley & Surrounding
                      <br />
                      Nova Scotia Communities
                    </p>
                  </div>
                </div>
                <div className="hover-slide-right flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[oklch(0.78_0.18_88)] shrink-0" />
                  <a
                    href="tel:+19028245333"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    (902) 824-5333
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full btn-3d text-white font-semibold"
                >
                  <Link href="/contact">Request a Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white/60">
              <p>
                © {new Date().getFullYear()} Versatile Home Solutions. All
                rights reserved.
              </p>
              <p>Proudly serving Nova Scotia homeowners.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[oklch(0.28_0.06_250)] border-t border-white/10 p-3 z-40">
        <Button
          asChild
          className="w-full btn-3d text-white font-semibold"
        >
          <Link href="/contact">Request a Free Estimate</Link>
        </Button>
      </div>
    </div>
  );
}
