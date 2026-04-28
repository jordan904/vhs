import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";

// Eager: rendered on first paint at "/"
import Home from "./pages/Home";

// Lazy: each becomes its own chunk fetched only when its route is hit
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const MetalRoofing = lazy(() => import("./pages/services/MetalRoofing"));
const Decks = lazy(() => import("./pages/services/Decks"));
const ShedsOutbuildings = lazy(() => import("./pages/services/ShedsOutbuildings"));
const Fences = lazy(() => import("./pages/services/Fences"));
const LvpFlooring = lazy(() => import("./pages/services/LvpFlooring"));
const Process = lazy(() => import("./pages/Process"));
const ServiceArea = lazy(() => import("./pages/ServiceArea"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-[oklch(0.65_0.18_88)]/30 border-t-[oklch(0.65_0.18_88)] animate-spin" aria-label="Loading" />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/roofing" component={MetalRoofing} />
          <Route path="/services/metal-roofing" component={MetalRoofing} />
          <Route path="/services/decks" component={Decks} />
          <Route path="/services/sheds-outbuildings" component={ShedsOutbuildings} />
          <Route path="/services/fences" component={Fences} />
          <Route path="/services/lvp-flooring" component={LvpFlooring} />
          <Route path="/process" component={Process} />
          <Route path="/service-area" component={ServiceArea} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WouterRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
