import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import OlimpoPage from "./pages/OlimpoPage";
import HeroisPage from "./pages/HeroisPage";
import PrimordiaisPage from "./pages/PrimordiaisPage";
import MenoresPage from "./pages/MenoresPage";
import BlogPage from "./pages/BlogPage";
import TimelinePage from "./pages/TimelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/olimpo" element={<OlimpoPage />} />
              <Route path="/herois" element={<HeroisPage />} />
              <Route path="/primordiais" element={<PrimordiaisPage />} />
              <Route path="/menores" element={<MenoresPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
