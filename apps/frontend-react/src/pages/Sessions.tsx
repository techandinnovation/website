import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Play, Video, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = ['upcoming', 'past'];

const upcomingSessions = [
  {
    id: 1,
    title: 'Building Scalable APIs with Node.js',
    speaker: 'Nihal Yadav',
    role: 'Founder & Full Stack Developer',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: '2 hours',
    attendees: 127,
    description: 'Learn best practices for building production-ready APIs that scale.',
  },
  {
    id: 2,
    title: 'Cracking Product-Based Company Interviews',
    speaker: 'Moksh Mishra',
    role: 'Co-Founder',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: '1.5 hours',
    attendees: 89,
    description: 'Insider tips and strategies for landing your dream job at top tech companies.',
  },
  {
    id: 3,
    title: 'Introduction to System Design',
    speaker: 'Guest Expert',
    role: 'Senior Engineer at Google',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    duration: '2 hours',
    attendees: 156,
    description: 'Fundamentals of designing scalable distributed systems.',
  },
];

const pastSessions = [
  {
    id: 4,
    title: 'React Performance Optimization',
    speaker: 'Nihal Yadav',
    date: '2024-11-15',
    duration: '1.5 hours',
    views: 342,
    videoUrl: '#',
  },
  {
    id: 5,
    title: 'Git & GitHub for Beginners',
    speaker: 'Community Member',
    date: '2024-11-08',
    duration: '1 hour',
    views: 567,
    videoUrl: '#',
  },
  {
    id: 6,
    title: 'Introduction to Docker',
    speaker: 'Moksh Mishra',
    date: '2024-11-01',
    duration: '2 hours',
    views: 289,
    videoUrl: '#',
  },
  {
    id: 7,
    title: 'JavaScript ES6+ Features',
    speaker: 'Nihal Yadav',
    date: '2024-10-25',
    duration: '1.5 hours',
    views: 456,
    videoUrl: '#',
  },
];

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
    <div className="flex gap-2">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <span className="font-display text-lg font-bold text-foreground">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground capitalize">{key.slice(0, 1)}</span>
        </div>
      ))}
    </div>
  );
}

export default function Sessions() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="🗓️ Sessions"
            title="Live Learning Sessions"
            description="Join interactive workshops and learn directly from industry experts and community leaders"
          />
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
                className="capitalize"
              >
                {tab} Sessions
              </Button>
            ))}
          </div>

          {/* Upcoming Sessions */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                  )}
                  
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        {index === 0 && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-2">
                            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                            Next Session
                          </span>
                        )}
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {session.title}
                        </h3>
                      </div>
                      {index === 0 && <CountdownTimer targetDate={session.date} />}
                    </div>

                    <p className="text-muted-foreground mb-4">{session.description}</p>

                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {session.speaker.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{session.speaker}</p>
                          <p className="text-xs">{session.role}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {session.attendees} registered
                      </span>
                    </div>

                    <Button variant={index === 0 ? 'gradient' : 'outline'}>
                      <Play className="w-4 h-4" />
                      Register Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Past Sessions */}
          {activeTab === 'past' && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {pastSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{session.views} views</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {session.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{session.speaker}</span>
                    <span>{session.date}</span>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <Play className="w-4 h-4" />
                    Watch Recording
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
