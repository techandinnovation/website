import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

const courses = [
  {
    icon: Code,
    thumbnail: '/courses/gitGithubCrashCourse.jpg',
    title: 'Git & Github Crash Course',
    description: 'Master the essential Git & GitHub commands in one short, beginner-focused crash course.',
    students: '450+',
    url: "https://youtu.be/EOkItVOgjeE",
    duration: '30 Minutes',
    level: 'Beginner',
  },
  {
    icon: Code,
    thumbnail: '/courses/cpp1.jpg',
    title: 'C++ Complete Course Part 1',
    description: 'Learn C++ from scratch in Part 1 of this complete course, covering basics to intermediate concepts step by step.',
    students: '500+',
    url: "https://youtu.be/9uDNJJpTjiM",
    duration: '2 Hours 30 Minutes',
    level: 'Beginner',
  },
  {
    icon: Code,
    thumbnail: '/courses/cpcfpart1.jpeg',
    title: 'Start Competitive Programming | Codeforces (Part 1)',
    description: 'Confused about starting Competitive Programming? or Codeforces?, this video covers everything from scratch.',
    students: '200+',
    url: "https://youtu.be/vL5lLZfgSCY",
    duration: '2 Hours 30 Minutes',
    level: 'Beginner',
  }
];

export function CoursesPreview() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills That Drive Success. Learn by Doing."
          description="From mastering Full Stack Development to building crucial soft skills and excelling in placement preparation. Get certified and get hired"
        />

        <div className="mt-12 grid cursor-pointer sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              onClick={() => {
                window.open(course.url, '_blank');
              }}
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
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
