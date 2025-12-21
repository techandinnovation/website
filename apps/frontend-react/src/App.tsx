import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Updates from "./pages/Updates";
import Courses from "./pages/Courses";
import Sessions from "./pages/Sessions";
import Gallery from "./pages/Gallery";
import Forum from "./pages/Forum";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import CppRedirect from "./pages/CppRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/cpp" element={<CppRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
