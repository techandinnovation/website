import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Rocket, Briefcase, GraduationCap, Calendar, MapPin, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Updates', icon: Filter },
  { id: 'hackathon', label: 'Hackathons', icon: Rocket },
  { id: 'job', label: 'Jobs', icon: Briefcase },
  { id: 'internship', label: 'Internships', icon: GraduationCap },
];

const updates = [
  {
    id: 1,
    category: 'hackathon',
    title: 'NASA Space Apps Challenge - Jabalpur Edition',
    description: 'International hackathon event where students solve real-world challenges using NASA data. 48 hours of innovation, mentorship, and prizes.',
    date: 'Dec 15-17, 2024',
    location: 'Campus Auditorium',
    status: 'upcoming',
    link: '#',
  },
  {
    id: 2,
    category: 'hackathon',
    title: 'Code Sprint 2024',
    description: 'Annual 24-hour coding competition with exciting problem statements from industry partners.',
    date: 'Jan 20-21, 2025',
    location: 'Online',
    status: 'upcoming',
    link: '#',
  },
  {
    id: 3,
    category: 'job',
    title: 'Frontend Developer at TechCorp',
    description: 'Exciting opportunity for React developers with 0-2 years of experience. Competitive salary and growth opportunities.',
    date: 'Apply by Dec 30, 2024',
    location: 'Remote',
    status: 'active',
    link: '#',
  },
  {
    id: 4,
    category: 'job',
    title: 'Full Stack Engineer at StartupX',
    description: 'Join an early-stage startup working on cutting-edge AI products. Equity + salary package.',
    date: 'Apply by Jan 15, 2025',
    location: 'Bangalore',
    status: 'active',
    link: '#',
  },
  {
    id: 5,
    category: 'internship',
    title: 'Summer Internship at Google',
    description: 'Software Engineering Internship for students graduating in 2026. Work on real products used by millions.',
    date: 'Apply by Feb 1, 2025',
    location: 'Hyderabad/Bangalore',
    status: 'active',
    link: '#',
  },
  {
    id: 6,
    category: 'internship',
    title: 'Data Science Intern at Microsoft',
    description: 'Work with the Azure ML team on machine learning projects. Mentorship from industry experts.',
    date: 'Apply by Jan 31, 2025',
    location: 'Remote',
    status: 'active',
    link: '#',
  },
  {
    id: 7,
    category: 'hackathon',
    title: 'HackOverflow 2024',
    description: 'Successfully completed! 200+ participants built innovative solutions.',
    date: 'Nov 10-11, 2024',
    location: 'Campus',
    status: 'completed',
    link: '#',
  },
];

const getIcon = (category: string) => {
  switch (category) {
    case 'hackathon':
      return Rocket;
    case 'job':
      return Briefcase;
    case 'internship':
      return GraduationCap;
    default:
      return Rocket;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-primary/10 text-primary';
    case 'active':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'completed':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Updates() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredUpdates = activeCategory === 'all'
    ? updates
    : updates.filter(u => u.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="📢 Updates"
            title="Stay in the Loop"
            description="Discover hackathons, job opportunities, and internships curated for tech enthusiasts"
          />
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="gap-2"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((update, index) => {
              const Icon = getIcon(update.category);
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium capitalize', getStatusColor(update.status))}>
                      {update.status}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {update.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {update.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {update.location}
                    </span>
                  </div>

                  <a
                    href={update.link}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Learn More
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              );
            })}
          </div>

          {filteredUpdates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No updates found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
