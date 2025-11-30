import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, MessageSquare, Lightbulb, Bug, Calendar, 
  Send, MapPin, Phone, Github, Twitter, Linkedin, Instagram
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@techandinnovation.com' },
  { icon: MapPin, label: 'Location', value: 'Engineering Campus, Jabalpur' },
  { icon: Phone, label: 'Phone', value: '+91 9876543210' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
];

const feedbackTypes = [
  { id: 'improvement', label: 'Site Improvement', icon: Lightbulb },
  { id: 'feature', label: 'Feature Request', icon: MessageSquare },
  { id: 'bug', label: 'Report a Bug', icon: Bug },
  { id: 'session', label: 'Session Idea', icon: Calendar },
];

export default function Connect() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'improvement',
    title: '',
    description: '',
    email: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you as soon as possible.',
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Feedback Received!',
      description: 'Thank you for helping us improve.',
    });
    setFeedbackForm({ type: 'improvement', title: '', description: '', email: '' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="📩 Connect"
            title="Get in Touch"
            description="Have questions, ideas, or feedback? We'd love to hear from you!"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-display font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
                <Button type="submit" variant="gradient" className="w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              badge="💡 Feedback"
              title="Help Us Improve"
              description="Your suggestions help us build a better community platform"
            />

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleFeedbackSubmit}
              className="mt-8 p-6 rounded-2xl bg-card border border-border"
            >
              {/* Feedback Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  What type of feedback do you have?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackForm({ ...feedbackForm, type: type.id })}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        feedbackForm.type === type.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                      }`}
                    >
                      <type.icon className="w-5 h-5 mx-auto mb-1" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={feedbackForm.title}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Describe your feedback in detail..."
                  rows={4}
                  value={feedbackForm.description}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                />
                <Button type="submit" variant="gradient">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
