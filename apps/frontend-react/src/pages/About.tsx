import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { Target, Eye, Heart, Trophy, Users, Rocket, GraduationCap, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to democratize tech education and make innovation accessible to every student.',
  },
  {
    icon: Eye,
    title: 'Vision Forward',
    description: 'Building a generation of creators, not just consumers of technology.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Every member matters. We grow together, support each other, and celebrate every win.',
  },
];

const achievements = [
  {
    icon: Users,
    value: '650+',
    label: 'Students Trained',
    description: 'Largest offline Full Stack Web Development program',
  },
  {
    icon: Globe,
    value: '1',
    label: 'International Hackathon',
    description: 'NASA Space Apps Challenge - Jabalpur Edition',
  },
  {
    icon: Trophy,
    value: '25+',
    label: 'Workshops Conducted',
    description: 'Hands-on learning sessions across multiple domains',
  },
  {
    icon: GraduationCap,
    value: '100+',
    label: 'Certifications Awarded',
    description: 'Recognizing excellence and achievement',
  },
];

const founders = [
  {
    name: 'Nihal Yadav',
    role: 'Founder & Lead',
    initials: 'NY',
    bio: 'A passionate developer who believes in learning by doing. Spearheaded the initiative to create a proper tech community after realizing the gap in the ecosystem.',
  },
  {
    name: 'Moksh Mishra',
    role: 'Co-Founder',
    initials: 'MM',
    bio: 'Dedicated to building systems that empower students. Focuses on creating sustainable learning pathways and community engagement.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-bg" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground mb-4">
              📜 Our Story
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Building the Future,{' '}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tech & Innovation started with a simple belief: every student deserves 
              access to quality tech education and a supportive community to grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="🚀 The Origin"
            title="How It All Started"
            align="center"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
              <p>
                Our founder has always believed in giving <strong className="text-foreground">1000% in everything</strong>. 
                Whether it was committing to a fitness goal or mastering a new skill, 
                the philosophy was simple: go all in.
              </p>
              
              <p>
                The learning philosophy that shaped Tech & Innovation was born from a 
                preference for <strong className="text-foreground">live demonstrations and experimentation</strong> over 
                traditional textbook learning. Real knowledge comes from doing, not just reading.
              </p>
              
              <p>
                Before college, there was immense excitement about joining tech clubs—inspired 
                by stories from NITs and IITs where student communities were building amazing 
                things together.
              </p>
              
              <p className="text-foreground font-medium border-l-4 border-primary pl-6">
                But reality hit hard. Upon joining, there was a glaring absence of any 
                active, proper tech community. The disappointment was real.
              </p>
              
              <p>
                Instead of accepting the status quo, after the first year, the decision 
                was made to <strong className="text-foreground">build what was missing</strong>. 
                Tech & Innovation was born—a community by students, for students.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="💡 Values"
            title="What We Stand For"
            description="The principles that guide everything we do"
          />
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <FeatureCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="🏆 Achievements"
            title="Milestones We're Proud Of"
            description="Numbers that tell our story of impact"
          />
          
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-foreground mb-1">
                  {achievement.value}
                </div>
                <div className="font-medium text-foreground mb-2">
                  {achievement.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="👥 Leadership"
            title="Meet the Founders"
            description="The visionaries behind Tech & Innovation"
          />
          
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden group hover-lift"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
                    <span className="font-display text-2xl font-bold text-primary-foreground">
                      {founder.initials}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground">{founder.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
