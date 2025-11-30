import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, HelpCircle, Coffee, BookOpen, 
  ThumbsUp, MessageCircle, Clock, Filter, Plus, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'doubts', label: 'Doubts & Q&A', icon: HelpCircle, description: 'Ask technical questions' },
  { id: 'general', label: 'General Chat', icon: Coffee, description: 'Casual discussions' },
  { id: 'resources', label: 'Resources', icon: BookOpen, description: 'Curated solutions & guides' },
];

const posts = [
  {
    id: 1,
    section: 'doubts',
    author: 'Ankit Kumar',
    avatar: 'AK',
    title: 'How to optimize React performance with useMemo?',
    content: 'I\'m building a complex dashboard and noticing some performance issues. When should I use useMemo vs useCallback?',
    time: '2 hours ago',
    replies: 12,
    likes: 34,
    tags: ['React', 'Performance'],
    solved: true,
  },
  {
    id: 2,
    section: 'doubts',
    author: 'Priya Sharma',
    avatar: 'PS',
    title: 'Best approach for state management in large apps?',
    content: 'I\'m confused between Redux, Zustand, and Context API. Which one should I choose for a medium-sized e-commerce app?',
    time: '5 hours ago',
    replies: 23,
    likes: 56,
    tags: ['React', 'State Management'],
    solved: false,
  },
  {
    id: 3,
    section: 'general',
    author: 'Rahul Verma',
    avatar: 'RV',
    title: 'My journey from 0 to software engineer at Google',
    content: 'After 18 months of preparation and countless rejections, I finally made it. Here\'s my complete roadmap...',
    time: '1 day ago',
    replies: 67,
    likes: 256,
    tags: ['Career', 'Placement'],
    solved: false,
  },
  {
    id: 4,
    section: 'resources',
    author: 'Nihal Yadav',
    avatar: 'NY',
    title: 'Complete DSA roadmap with resources - 2024 edition',
    content: 'A comprehensive guide covering all topics from basics to advanced, with curated problem lists and video explanations.',
    time: '3 days ago',
    replies: 89,
    likes: 312,
    tags: ['DSA', 'Roadmap'],
    solved: false,
    pinned: true,
  },
  {
    id: 5,
    section: 'doubts',
    author: 'Sneha Patel',
    avatar: 'SP',
    title: 'Understanding closures in JavaScript',
    content: 'Can someone explain closures with a practical example? The MDN docs are confusing me.',
    time: '4 hours ago',
    replies: 8,
    likes: 15,
    tags: ['JavaScript', 'Fundamentals'],
    solved: true,
  },
  {
    id: 6,
    section: 'general',
    author: 'Dev Singh',
    avatar: 'DS',
    title: 'Weekend hackathon project ideas?',
    content: 'Looking for interesting project ideas to build this weekend. Something that can be completed in 2 days.',
    time: '6 hours ago',
    replies: 15,
    likes: 28,
    tags: ['Projects', 'Ideas'],
    solved: false,
  },
  {
    id: 7,
    section: 'resources',
    author: 'Moksh Mishra',
    avatar: 'MM',
    title: 'System Design Interview Preparation Guide',
    content: 'Everything you need to crack system design rounds - from basics to advanced distributed systems.',
    time: '1 week ago',
    replies: 45,
    likes: 189,
    tags: ['System Design', 'Interview'],
    solved: false,
    pinned: true,
  },
];

export default function Forum() {
  const [activeSection, setActiveSection] = useState('all');
  const [isLoggedIn] = useState(false); // Simulated auth state

  const filteredPosts = activeSection === 'all'
    ? posts
    : posts.filter(p => p.section === activeSection);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="🗣️ Community Forum"
            title="Join the Conversation"
            description="Ask questions, share knowledge, and connect with fellow tech enthusiasts"
          />
        </div>
      </section>

      {/* Login Prompt */}
      {!isLoggedIn && (
        <section className="py-8 bg-accent/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <p className="text-foreground">
                  <strong>Sign in</strong> to post questions and participate in discussions
                </p>
              </div>
              <Button variant="gradient">
                Login to Participate
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Forum Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant={activeSection === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSection('all')}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                All Posts
              </Button>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className="gap-2"
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </Button>
              ))}
            </div>

            {/* Create Post Button */}
            <div className="mb-6">
              <Button variant="gradient" className="gap-2" disabled={!isLoggedIn}>
                <Plus className="w-4 h-4" />
                Create New Post
              </Button>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    'group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer',
                    post.pinned && 'border-primary/20 bg-accent/30'
                  )}
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{post.avatar}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {post.pinned && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            📌 Pinned
                          </span>
                        )}
                        {post.solved && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                            ✓ Solved
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground capitalize bg-secondary px-2 py-0.5 rounded-full">
                          {post.section}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{post.author}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.time}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </span>
                        </div>

                        <div className="flex gap-2 ml-auto">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
