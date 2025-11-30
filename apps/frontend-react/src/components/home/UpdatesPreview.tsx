import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Rocket, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

const updates = [
  {
    type: 'Hackathon',
    icon: Rocket,
    title: 'NASA Space Apps Challenge',
    description: 'Join the international hackathon event - Jabalpur Edition',
    date: 'Dec 15-17, 2024',
    location: 'Campus Auditorium',
    color: 'bg-primary',
  },
  {
    type: 'Job Opening',
    icon: Briefcase,
    title: 'Frontend Developer at TechCorp',
    description: 'Exciting opportunity for React developers with 0-2 years exp',
    date: 'Apply by Dec 30',
    location: 'Remote',
    color: 'bg-accent',
  },
];

export function UpdatesPreview() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="The Latest in Innovation: Don't Miss Out"
          description="Stay ahead with insights into cutting-edge technology, upcoming hackathons, and exclusive jobs and internships opportunities"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {updates.map((update, index) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${update.color} flex items-center justify-center`}>
                    <update.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {update.type}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {update.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {update.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {update.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {update.location}
                  </span>
                </div>
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
          <Button asChild variant="outline">
            <Link to="/updates">
              View All Updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
