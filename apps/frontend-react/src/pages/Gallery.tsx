import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { X, Calendar, MapPin, Users, Play } from 'lucide-react';

const categories = ['all', 'hackathons', 'workshops', 'events', 'community'];

const galleryItems = [
  {
    id: 1,
    category: 'hackathons',
    title: 'NASA Space Apps Challenge 2024',
    date: 'October 2024',
    location: 'Campus Auditorium',
    attendees: 200,
    type: 'image',
    placeholder: 'Hackathon Opening Ceremony',
  },
  {
    id: 2,
    category: 'hackathons',
    title: 'HackOverflow 2024',
    date: 'November 2024',
    location: 'Tech Lab',
    attendees: 150,
    type: 'image',
    placeholder: 'Teams Collaborating',
  },
  {
    id: 3,
    category: 'workshops',
    title: 'Full Stack Web Dev Training',
    date: 'September 2024',
    location: 'Main Hall',
    attendees: 650,
    type: 'image',
    placeholder: 'Workshop Session',
  },
  {
    id: 4,
    category: 'workshops',
    title: 'React Masterclass',
    date: 'August 2024',
    location: 'Conference Room',
    attendees: 80,
    type: 'video',
    placeholder: 'Video: React Session Highlights',
  },
  {
    id: 5,
    category: 'events',
    title: 'Tech Talk Series',
    date: 'July 2024',
    location: 'Seminar Hall',
    attendees: 120,
    type: 'image',
    placeholder: 'Guest Speaker Session',
  },
  {
    id: 6,
    category: 'community',
    title: 'Community Meetup',
    date: 'June 2024',
    location: 'Campus Grounds',
    attendees: 100,
    type: 'image',
    placeholder: 'Community Gathering',
  },
  {
    id: 7,
    category: 'hackathons',
    title: 'Code Sprint Finals',
    date: 'May 2024',
    location: 'Innovation Hub',
    attendees: 75,
    type: 'image',
    placeholder: 'Winners Announcement',
  },
  {
    id: 8,
    category: 'workshops',
    title: 'DSA Bootcamp',
    date: 'April 2024',
    location: 'Classroom A',
    attendees: 200,
    type: 'image',
    placeholder: 'Intensive DSA Training',
  },
  {
    id: 9,
    category: 'events',
    title: 'Annual Tech Fest',
    date: 'March 2024',
    location: 'Campus Wide',
    attendees: 500,
    type: 'video',
    placeholder: 'Video: Tech Fest Highlights',
  },
  {
    id: 10,
    category: 'community',
    title: 'Orientation Program',
    date: 'February 2024',
    location: 'Auditorium',
    attendees: 300,
    type: 'image',
    placeholder: 'New Member Welcome',
  },
  {
    id: 11,
    category: 'workshops',
    title: 'Git & GitHub Workshop',
    date: 'January 2024',
    location: 'Lab 3',
    attendees: 90,
    type: 'image',
    placeholder: 'Hands-on Session',
  },
  {
    id: 12,
    category: 'hackathons',
    title: 'Winter Hackathon',
    date: 'December 2023',
    location: 'Virtual',
    attendees: 180,
    type: 'image',
    placeholder: 'Online Collaboration',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="🖼️ Gallery"
            title="Moments That Matter"
            description="Relive the highlights from our hackathons, workshops, and community events"
          />
        </div>
      </section>

      {/* Filters & Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Gallery Grid - Masonry Style */}
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
                  {/* Placeholder Image */}
                  <div 
                    className={`w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center ${
                      index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                    }`}
                  >
                    <div className="text-center p-4">
                      {item.type === 'video' && (
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                          <Play className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <span className="text-muted-foreground text-sm">{item.placeholder}</span>
                    </div>
                  </div>

                  {/* Overlay */}
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

      {/* Lightbox Modal */}
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
              className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden border border-border"
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

              <div className="aspect-video bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <div className="text-center p-8">
                  {selectedItem.type === 'video' && (
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <span className="text-muted-foreground">{selectedItem.placeholder}</span>
                </div>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
