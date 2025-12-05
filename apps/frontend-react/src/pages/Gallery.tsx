import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { X, Calendar, MapPin, Users, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Three events with folders inside the public folder:
// public/gallery/fullstack/1.jpg .. n.jpg
// public/gallery/nasa/1.jpg .. n.jpg
// public/gallery/workshops/1.jpg .. n.jpg
const galleryItems = [
  {
    id: 1,
    category: 'classes',
    title: 'Full Stack Development Classes',
    date: '2025',
    location: 'Online / Campus',
    attendees: 120,
    type: 'image',
    placeholder: 'Full Stack Cohort',
    folder: 'gallery/fullstack',
  },
  {
    id: 2,
    category: 'hackathons',
    title: 'NASA Space Apps Hackathon',
    date: '2024',
    location: 'Campus Auditorium',
    attendees: 200,
    type: 'image',
    placeholder: 'NASA Space Apps',
    folder: 'gallery/nasa',
  },
  {
    id: 3,
    category: 'workshops',
    title: 'Career Workshops',
    date: '2025',
    location: 'Lecture Hall',
    attendees: 80,
    type: 'image',
    placeholder: 'Resume & LinkedIn Workshops',
    folder: 'gallery/workshops',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[number] | null>(null);

  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(false);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Probe folder for images named 1.jpg, 2.jpg, ... until first missing (maxImages limit)
  const probeImages = async (folder: string, maxImages = 40) => {
    const found: string[] = [];
    const loadImage = (src: string) => new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

    for (let i = 1; i <= maxImages; i++) {
      const src = `/${folder}/${i}.jpg`;
      // await sequentially to avoid hammering network in parallel
      // eslint-disable-next-line no-await-in-loop
      const ok = await loadImage(src);
      if (ok) found.push(src);
      else break;
    }

    return found;
  };

  // When an item is selected, probe its folder and load image list
  useEffect(() => {
    let mounted = true;
    if (!selectedItem) return undefined;

    setLoadingImages(true);
    setLightboxImages([]);
    setActiveIndex(0);

    (async () => {
      if (!selectedItem.folder) return;
      const imgs = await probeImages(selectedItem.folder);
      if (!mounted) return;
      setLightboxImages(imgs);
      setLoadingImages(false);
    })();

    return () => { mounted = false; };
  }, [selectedItem]);

  // keyboard navigation for modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (lightboxImages.length ? (i - 1 + lightboxImages.length) % lightboxImages.length : i));
      if (e.key === 'ArrowRight') setActiveIndex((i) => (lightboxImages.length ? (i + 1) % lightboxImages.length : i));
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedItem, lightboxImages]);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title="Moments That Matter"
            description="Relive the highlights from our hackathons, workshops, and community events"
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  <div
                    className={`w-full flex items-center justify-center bg-muted ${
                      index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                    } overflow-hidden`}
                  >
                    {item.folder ? (
                      <img
                        src={`/${item.folder}/1.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        {item.type === 'video' && (
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <span className="text-muted-foreground text-sm">{item.placeholder}</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {item.attendees}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => setSelectedItem(null)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="bg-background">
                <div className="relative bg-black/5 flex items-center justify-center">
                  {loadingImages ? (
                    <div className="p-12 text-center">Loading images...</div>
                  ) : lightboxImages.length ? (
                    <div className="w-full flex items-center justify-center">
                      <button
                        aria-label="previous"
                        className="absolute left-4 z-20 p-2 rounded-full bg-background/60 hover:bg-background"
                        onClick={() => setActiveIndex((i) => (lightboxImages.length ? (i - 1 + lightboxImages.length) % lightboxImages.length : i))}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <img
                        src={lightboxImages[activeIndex]}
                        alt={`${selectedItem.title} ${activeIndex + 1}`}
                        className="max-h-[70vh] w-auto max-w-full object-contain"
                      />

                      <button
                        aria-label="next"
                        className="absolute right-4 z-20 p-2 rounded-full bg-background/60 hover:bg-background"
                        onClick={() => setActiveIndex((i) => (lightboxImages.length ? (i + 1) % lightboxImages.length : i))}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-12 text-center">No images found for this event.</div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {selectedItem.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedItem.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedItem.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedItem.attendees} attendees
                    </span>
                  </div>

                  {lightboxImages.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                      {lightboxImages.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setActiveIndex(i)}
                          className={`w-20 h-12 rounded overflow-hidden border ${i === activeIndex ? 'border-primary' : 'border-border'} flex-shrink-0`}
                        >
                          <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
