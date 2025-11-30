import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

const courses = [
  {
    icon: Code,
    title: 'Full Stack Web Development',
    description: 'Master React, Node.js, and modern web technologies from scratch to deployment',
    students: '350+',
    duration: '12 weeks',
    level: 'Beginner',
  },
  {
    icon: Brain,
    title: 'DSA & Competitive Programming',
    description: 'Crack coding interviews with systematic problem-solving approaches',
    students: '200+',
    duration: '8 weeks',
    level: 'Intermediate',
  },
  {
    icon: Users,
    title: 'Soft Skills & Leadership',
    description: 'Communication, teamwork, and leadership skills for tech professionals',
    students: '150+',
    duration: '4 weeks',
    level: 'All Levels',
  },
  {
    icon: TrendingUp,
    title: 'Placement Preparation',
    description: 'Complete roadmap for campus placements with mock interviews',
    students: '280+',
    duration: '6 weeks',
    level: 'Advanced',
  },
];

export function CoursesPreview() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="📚 Courses"
          title="Master In-Demand Skills"
          description="Industry-relevant courses designed by experts to accelerate your tech career"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <course.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{course.students} enrolled</span>
                <span className="px-2 py-1 rounded-full bg-accent text-accent-foreground">
                  {course.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button asChild variant="gradient">
            <Link to="/courses">
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
