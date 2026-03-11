import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import MetalRoofing from "./pages/services/MetalRoofing";
import Decks from "./pages/services/Decks";
import ShedsOutbuildings from "./pages/services/ShedsOutbuildings";
import Fences from "./pages/services/Fences";
import GarbageBinsGardenBoxes from "./pages/services/GarbageBinsGardenBoxes";
import Process from "./pages/Process";
import ServiceArea from "./pages/ServiceArea";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/services/metal-roofing" component={MetalRoofing} />
        <Route path="/services/decks" component={Decks} />
        <Route path="/services/sheds-outbuildings" component={ShedsOutbuildings} />
        <Route path="/services/fences" component={Fences} />
        <Route path="/services/garbage-bins-garden-boxes" component={GarbageBinsGardenBoxes} />
        <Route path="/process" component={Process} />
        <Route path="/service-area" component={ServiceArea} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
