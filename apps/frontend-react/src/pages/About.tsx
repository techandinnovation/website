import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { Target, Eye, Heart, Trophy, Users, Rocket, GraduationCap, Globe, Mail, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

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
    name: 'Moksh Mishra',
    image: '/founders/moksh.jpeg', // Update with actual image path
    // role: 'Co-Founder',
    bio: 'A passionate developer who believes in learning by doing. Spearheaded the initiative to create a proper tech community after realizing the gap in the ecosystem.',
    social: {
      github: 'https://github.com/MokshMishra',
      linkedin: 'https://www.linkedin.com/in/moksh-mishra-956868289',
      instagram: 'https://www.instagram.com/iammokshmishra',
      twitter: null,
      email: 'mailto:iammokshmishra@gmail.com'
    }
  },
  {
    name: 'Nihal Yadav',
    image: '/founders/nihal.png', // Update with actual image path
    // role: 'Co-Founder',
    bio: 'Dedicated to building systems that empower students. Focuses on creating sustainable learning pathways and community engagement.',
    social: {
      github: 'https://github.com/nihal29055',
      linkedin: 'https://www.linkedin.com/in/nihal-yadav2',
      instagram: 'https://www.instagram.com/nihaaalll_29',
      twitter: null, // Example: No Twitter account
      email: 'mailto:yadavnihal544@gmail.com'
    }
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
              Our Mission: Turning Passion into{' '}
              <span className="gradient-text">Prowess</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tech & Innovation is more than just a club—it's a movement. Founded on the principle that the most valuable skills are acquired through hands-on experience and relentless effort, we exist to bridge the gap between academic theory and industry reality. We are dedicated to providing a dynamic, real-world platform for students to master full-stack development, DSA, and essential soft skills through continuous training, live projects, and unparalleled opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="The Spark: How Tech & Innovation Was Born"
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
                The journey began with a simple yet powerful belief: Success is built on 1000% effort. Our founder, driven by an innate passion for hard work and self-mastery (a trait proven in every challenge, from self-disciplined workouts to intense coding sessions), found the traditional learning path restrictive. He learned best by doing, experimenting, and seeing concepts live, not through rote memorization.
              </p>

              <p>
                Following his enthusiasm for tech, the expectation was a vibrant college ecosystem of competitive, project-based tech clubs. The reality was a disappointing void. This lack of a hands-on, community-driven space was the spark. Instead of settling, the decision was made: If the club doesn't exist, we will build it.
              </p>

              <p>
                In the Second Year, Tech & Innovation was officially launched. Our goal was clear: replicate the best parts of the elite tech club experience—live training, senior interaction, and real-world project development—right here.
              </p>

              {/* <p className="text-foreground font-medium border-l-4 border-primary pl-6">
                But reality hit hard. Upon joining, there was a glaring absence of any
                active, proper tech community. The disappointment was real.
              </p>

              <p>
                Instead of accepting the status quo, after the first year, the decision
                was made to <strong className="text-foreground">build what was missing</strong>.
                Tech & Innovation was born—a community by students, for students.
              </p> */}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Achievements */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="🏆 Achievements"
            title="Our Impact: Achievements that Define Us"
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
                  {/* Profile Image */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className='flex flex-col mt-5'>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {founder.name}
                      </h3>

                      {/* Social Links */}
                      <div className="flex items-center gap-3">
                        {founder.social.github && (
                          <a
                            href={founder.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${founder.name}'s GitHub`}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}

                        {founder.social.linkedin && (
                          <a
                            href={founder.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${founder.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}

                        {founder.social.twitter && (
                          <a
                            href={founder.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${founder.name}'s Twitter`}
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}

                        {founder.social.instagram && (
                          <a
                            href={founder.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${founder.name}'s Instagram`}
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                        )}

                        {founder.social.email && (
                          <a
                            href={founder.social.email}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Email ${founder.name}`}
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

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
