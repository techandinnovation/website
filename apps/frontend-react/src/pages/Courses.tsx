import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import {
  Code, Brain, Users, TrendingUp, Palette, Database, Shield, Cloud,
  Clock, Users as UsersIcon, Star, ArrowRight, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Courses' },
  { id: 'webdev', label: 'Web Development' },
  { id: 'dsa', label: 'DSA & CP' },
  { id: 'placement', label: 'Placement Prep' },
  { id: 'softskills', label: 'Soft Skills' },
];

const courses = [
  {
    id: 1,
    category: 'all',
    icon: Code,
    url: "https://youtu.be/EOkItVOgjeE",
    title: 'Git & GitHub Crash Course',
    description: 'Master the essential Git & GitHub commands in one short, beginner-focused crash course.',
    duration: '30 Minutes',
    students: 250,
    rating: 4.9,
    level: 'Beginner',
    modules: 48,
    certified: false,
    thumbnail: '/courses/gitGithubCrashCourse.jpg',
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'Intermediate':
      return 'bg-primary/10 text-primary';
    case 'Advanced':
      return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    default:
      return 'bg-accent text-accent-foreground';
  }
};

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="📚 Courses"
            title="Master In-Demand Skills"
            description="Industry-relevant courses designed by experts. Learn at your pace, get certified, and accelerate your career."
          />
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift overflow-hidden"
              >
                {/* Thumbnail Section - Full Width */}
                <div onClick={() => {
                  window.open(course.url, '_blank');
                }} className="w-full h-48 cursor-pointer bg-gray-200 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                      <course.icon className="w-16 h-16 text-primary" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getLevelColor(course.level))}>
                      {course.level}
                    </span>
                    {course.certified && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Certificate
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="w-4 h-4 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <UsersIcon className="w-4 h-4 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">{course.students}+</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Star className="w-4 h-4 text-yellow-500 mb-1" />
                      <span className="text-xs text-muted-foreground">{course.rating}</span>
                    </div>
                  </div>

                  <Button onClick={() => {
                    window.open(course.url, '_blank');
                  }} className="mt-4 w-full" variant="hero">
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center font-extrabold text-xl md:text-4xl animate-bounce text-cyan-500">
        More courses coming soon... Stay Tuned!!
      </div>
      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join 650+ students who are already building their future with Tech & Innovation courses.
          </p>
          <Button variant="gradient" size="lg">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
