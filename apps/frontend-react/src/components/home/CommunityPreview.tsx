import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

const discussions = [
  {
    avatar: 'AK',
    author: 'Ankit Kumar',
    time: '2 hours ago',
    title: 'How to optimize React performance with useMemo?',
    replies: 12,
    likes: 34,
    category: 'Doubts',
  },
  {
    avatar: 'PS',
    author: 'Priya Sharma',
    time: '5 hours ago',
    title: 'My journey from 0 to software engineer at Google',
    replies: 45,
    likes: 128,
    category: 'General',
  },
  {
    avatar: 'RV',
    author: 'Rahul Verma',
    time: '1 day ago',
    title: 'Complete DSA roadmap with resources - 2024 edition',
    replies: 67,
    likes: 256,
    category: 'Resources',
  },
];

export function CommunityPreview() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="🗣️ Community"
          title="Join the Conversation"
          description="Connect with peers, ask questions, and share your knowledge"
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {discussions.map((discussion, index) => (
            <motion.div
              key={discussion.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{discussion.avatar}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{discussion.author}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {discussion.time}
                    </span>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
                      {discussion.category}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {discussion.title}
                  </h4>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {discussion.likes}
                    </span>
                  </div>
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
            <Link to="/forum">
              Join the Community
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
