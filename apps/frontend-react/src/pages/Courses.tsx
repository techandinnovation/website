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
    category: 'webdev',
    icon: Code,
    title: 'Full Stack Web Development',
    description: 'Master React, Node.js, MongoDB, and modern web technologies. Build production-ready applications from scratch.',
    duration: '12 weeks',
    students: 350,
    rating: 4.9,
    level: 'Beginner',
    modules: 48,
    certified: true,
  },
  {
    id: 2,
    category: 'webdev',
    icon: Palette,
    title: 'Frontend Mastery with React',
    description: 'Deep dive into React ecosystem including Redux, Next.js, and advanced patterns.',
    duration: '8 weeks',
    students: 180,
    rating: 4.8,
    level: 'Intermediate',
    modules: 32,
    certified: true,
  },
  {
    id: 3,
    category: 'webdev',
    icon: Database,
    title: 'Backend Development with Node.js',
    description: 'Learn server-side development, REST APIs, authentication, and database management.',
    duration: '10 weeks',
    students: 145,
    rating: 4.7,
    level: 'Intermediate',
    modules: 40,
    certified: true,
  },
  {
    id: 4,
    category: 'dsa',
    icon: Brain,
    title: 'DSA & Competitive Programming',
    description: 'Systematic approach to data structures and algorithms. Crack coding interviews with confidence.',
    duration: '16 weeks',
    students: 420,
    rating: 4.9,
    level: 'All Levels',
    modules: 64,
    certified: true,
  },
  {
    id: 5,
    category: 'dsa',
    icon: TrendingUp,
    title: 'Advanced Problem Solving',
    description: 'Master advanced algorithms, dynamic programming, and graph theory.',
    duration: '8 weeks',
    students: 95,
    rating: 4.8,
    level: 'Advanced',
    modules: 28,
    certified: true,
  },
  {
    id: 6,
    category: 'placement',
    icon: TrendingUp,
    title: 'Complete Placement Preparation',
    description: 'Comprehensive roadmap covering aptitude, DSA, system design, and mock interviews.',
    duration: '6 weeks',
    students: 280,
    rating: 4.9,
    level: 'All Levels',
    modules: 24,
    certified: true,
  },
  {
    id: 7,
    category: 'placement',
    icon: Shield,
    title: 'System Design Fundamentals',
    description: 'Learn to design scalable systems. Essential for senior engineering interviews.',
    duration: '4 weeks',
    students: 75,
    rating: 4.7,
    level: 'Advanced',
    modules: 16,
    certified: true,
  },
  {
    id: 8,
    category: 'softskills',
    icon: Users,
    title: 'Communication & Leadership',
    description: 'Develop essential soft skills including public speaking, teamwork, and leadership.',
    duration: '4 weeks',
    students: 150,
    rating: 4.6,
    level: 'All Levels',
    modules: 16,
    certified: false,
  },
  {
    id: 9,
    category: 'softskills',
    icon: Users,
    title: 'Technical Interview Skills',
    description: 'Master the art of technical interviews - from resume building to offer negotiation.',
    duration: '3 weeks',
    students: 200,
    rating: 4.8,
    level: 'All Levels',
    modules: 12,
    certified: false,
  },
  {
    id: 10,
    category: 'webdev',
    icon: Cloud,
    title: 'Cloud & DevOps Essentials',
    description: 'Learn AWS, Docker, CI/CD pipelines, and modern deployment practices.',
    duration: '6 weeks',
    students: 85,
    rating: 4.7,
    level: 'Intermediate',
    modules: 24,
    certified: true,
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
                className="group flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <course.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getLevelColor(course.level))}>
                    {course.level}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                  {course.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <UsersIcon className="w-4 h-4" />
                    {course.students}+
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {course.modules} modules
                  </span>
                  {course.certified && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Certificate Available
                    </span>
                  )}
                </div>

                <Button className="mt-4 w-full" variant="outline">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
