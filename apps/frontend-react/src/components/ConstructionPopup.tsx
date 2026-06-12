import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function ConstructionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("constructionPopupSeen");
    if (!hasSeenPopup) {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsVisible(false);
      setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("constructionPopupSeen", "true");
      }, 300);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  };

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.5 5.5L19 12l-5.5 1.5L12 21l-1.5-5.5L5 12l5.5-1.5L12 3z" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      ),
      title: "New Features",
      description: "Exciting new tools and capabilities",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Better Performance",
      description: "Faster and more responsive experience",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Enhanced UI",
      description: "Modern and intuitive design",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`!fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 sm:max-w-[600px] p-0 overflow-hidden transition-all duration-300 ${isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
          }`}
      >
        {/* Animated top bar with blue theme */}
        <div className="relative h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-2 left-4 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <rect x="10" y="10" width="40" height="40" rx="8" fill="white" className="animate-pulse" />
            </svg>
          </div>
          <div className="absolute top-8 right-8 opacity-20">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="white" className="animate-bounce" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-16 opacity-20">
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon points="15,2 28,28 2,28" fill="white" className="animate-pulse" />
            </svg>
          </div>

          {/* Construction icon */}
          <div className="absolute top-6 right-6 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.5 17.5L3 10.5l4.5-4.5L14 12.5l1.5-1.5L18 13.5l-1.5 1.5-6.5 6.5-4.5-4.5 1.5-1.5L14 22.5l7-7-4-4-7 7-1-1 1.5-1.5" />
              <path d="M18 6l1.5 1.5" />
              <path d="M20 4l1.5 1.5" />
              <path d="M6 18l1.5 1.5" />
            </svg>
          </div>

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Under Construction
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-1 w-10 bg-white/50 rounded-full" />
                <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                <div className="h-1 w-10 bg-white/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 pt-6 bg-white">
          <DialogHeader className="text-left mb-6">
            <DialogDescription className="text-lg text-gray-600 leading-relaxed">
              We're currently working on improving the platform, so some features
              may not function as expected. We're building something better and
              will be back soon with an enhanced experience. Stay tuned!
            </DialogDescription>
          </DialogHeader>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 transition-all duration-500 ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-blue-600 mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>


          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Thank you for your patience! 🚧
            </p>
          </div>
        </div>

        {/* Custom close button */}
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 z-10"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </DialogContent>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animationTimingFunction: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animationTimingFunction: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </Dialog>
  );
}