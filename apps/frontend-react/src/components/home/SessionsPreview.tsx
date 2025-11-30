import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const upcomingSession = {
  title: 'Building Scalable APIs with Node.js',
  speaker: 'Nihal Yadav',
  role: 'Founder & Full Stack Developer',
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  attendees: 127,
};

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-2">
            <span className="font-display text-2xl font-bold text-foreground">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground uppercase">{key}</span>
        </div>
      ))}
    </div>
  );
}

export function SessionsPreview() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Live Sessions. Real Mentors. Real Impact."
          description="Join our weekly sessions and workshops led by industry experts and experienced seniors. Learn, interact, and build your network live"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="relative p-8 rounded-3xl bg-card border border-border overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  Upcoming
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {upcomingSession.title}
              </h3>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">NY</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{upcomingSession.speaker}</p>
                    <p className="text-sm">{upcomingSession.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{upcomingSession.attendees} registered</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-4">Session starts in:</p>
                <CountdownTimer targetDate={upcomingSession.date} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg">
                  <Play className="w-4 h-4" />
                  Register Now
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/sessions">
                    View All Sessions
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
