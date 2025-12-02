import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Play, Calendar, Youtube, ExternalLink, Image as ImageIcon, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge'; // Optional: for better badges

interface YouTubeSession {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  scheduledStartTime: string;
  thumbnails: {
    high: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  liveStreamDetails?: {
    concurrentViewers?: string;
    scheduledStartTime?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
  url: string;
  isLive?: boolean;
  isUpcoming?: boolean;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
// const YOUTUBE_API_KEY = 'AIzaSyC_RXNCjh_5vc7LB00NBfdw6po-2xrrag0';
const CHANNEL_ID = 'UC2kFjeEjNA_o3Q1pRedZHUQ';

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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3 sm:gap-4">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center mb-2 shadow-sm">
            <span className="font-display text-xl sm:text-2xl font-bold text-primary">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {key}
          </span>
        </div>
      ))}
    </div>
  );
}

function SessionSkeleton() {
  return (
    <div className="relative rounded-3xl bg-card border border-border overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full max-w-2xl" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

function ThumbnailWithPlayButton({ thumbnailUrl, title }: { thumbnailUrl: string; title: string }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl mb-8 border border-border/50">
      {/* Thumbnail Image */}
      <div className="aspect-video relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = `https://img.youtube.com/vi/dummy/maxresdefault.jpg`;
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Live/Upcoming Badge on Thumbnail */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-semibold">UPCOMING</span>
          </div>
        </div>

        {/* YouTube Logo */}
        <div className="absolute top-4 right-4">
          <div className="bg-youtube/90 backdrop-blur-sm p-2 rounded-lg">
            <Youtube className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <div className="ml-1">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 fill-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}

function formatFullDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

export function SessionsPreview() {
  const [upcomingSession, setUpcomingSession] = useState<YouTubeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingLiveSessions();

    // Refresh every 5 minutes
    const interval = setInterval(fetchUpcomingLiveSessions, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchUpcomingLiveSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch upcoming live broadcasts
      const searchResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            channelId: CHANNEL_ID,
            type: 'video',
            eventType: 'upcoming',
            maxResults: 1,
            order: 'date',
            key: YOUTUBE_API_KEY,
          },
        }
      );

      if (searchResponse.data.items.length > 0) {
        const video = searchResponse.data.items[0];
        const videoId = video.id.videoId;

        // Get more details including thumbnails
        const detailsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,liveStreamingDetails,statistics',
              id: videoId,
              key: YOUTUBE_API_KEY,
            },
          }
        );

        const details = detailsResponse.data.items[0];

        const sessionData: YouTubeSession = {
          id: videoId,
          title: details.snippet.title,
          description: details.snippet.description,
          channelTitle: details.snippet.channelTitle,
          scheduledStartTime: details.liveStreamingDetails?.scheduledStartTime ||
            details.snippet.publishedAt,
          thumbnails: details.snippet.thumbnails,
          liveStreamDetails: details.liveStreamingDetails,
          statistics: details.statistics,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          isLive: details.snippet.liveBroadcastContent === 'live',
          isUpcoming: details.snippet.liveBroadcastContent === 'upcoming',
        };

        setUpcomingSession(sessionData);
      } else {
        // No upcoming sessions found
        setError('No upcoming live sessions scheduled');
        setFallbackData();
      }
    } catch (err) {
      console.error('Error fetching YouTube data:', err);
      setError('Unable to fetch live session data');
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackData = () => {
    // Fallback to sample session data
    const fallbackSession: YouTubeSession = {
      id: 'fallback-123',
      title: 'Building Scalable APIs with Node.js',
      description: 'Join us for an in-depth live session where we explore advanced Node.js concepts, best practices for building scalable APIs, and real-world implementation strategies.',
      channelTitle: 'Tech Mentors Community',
      scheduledStartTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnails: {
        high: {
          url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          width: 480,
          height: 360
        },
        medium: {
          url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          width: 320,
          height: 180
        }
      },
      statistics: {
        viewCount: '127',
        likeCount: '45'
      },
      url: 'https://www.youtube.com',
      isUpcoming: true
    };

    setUpcomingSession(fallbackSession);
  };

  const getBestThumbnail = (thumbnails: YouTubeSession['thumbnails']) => {
    return thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url;
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Live Sessions. Real Mentors. Real Impact."
            description="Join our weekly sessions and workshops led by industry experts and experienced seniors. Learn, interact, and build your network live"
          />
          <div className="mt-12 max-w-2xl mx-auto">
            <SessionSkeleton />
          </div>
        </div>
      </section>
    );
  }

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
          className="mt-12 max-w-2xl mx-auto"
        >
          <div id='sessions' className="relative rounded-3xl bg-gradient-to-br from-card via-card to-card/95 border border-border/50 overflow-hidden shadow-xl shadow-primary/5">
            {/* Background glow effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative backdrop-blur-sm">
              {upcomingSession && (
                <>
                  {/* Thumbnail Section */}
                  {upcomingSession.thumbnails && (
                    <ThumbnailWithPlayButton
                      thumbnailUrl={getBestThumbnail(upcomingSession.thumbnails)}
                      title={upcomingSession.title}
                    />
                  )}

                  {/* Content Section */}
                  <div className="px-8 pb-8">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <Badge variant="destructive" className="gap-1.5 py-1.5 px-3">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        Upcoming Live
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 py-1.5 px-3 border-youtube/30 text-youtube">
                        <Youtube className="w-4 h-4" />
                        YouTube Live
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                        <Calendar className="w-4 h-4" />
                        {formatRelativeTime(upcomingSession.scheduledStartTime)}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                      {upcomingSession.title}
                    </h3>

                    {/* Channel and Stats */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                          <Youtube className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{upcomingSession.channelTitle}</p>
                          <p className="text-sm">YouTube Channel</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* {upcomingSession.statistics?.viewCount && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">
                              {parseInt(upcomingSession.statistics.viewCount).toLocaleString()}
                            </span>
                            <span className="text-sm">waiting</span>
                          </div>
                        )} */}

                        <div className="flex items-center gap-1.5 text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            {formatFullDateTime(upcomingSession.scheduledStartTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {upcomingSession.description && (
                      <div className="mb-8">
                        <p className="text-foreground/80 leading-relaxed line-clamp-3">
                          {upcomingSession.description}
                        </p>
                      </div>
                    )}

                    {/* Countdown Timer */}
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                        <p className="text-lg font-semibold text-foreground">Session starts in:</p>
                      </div>
                      <CountdownTimer
                        targetDate={new Date(upcomingSession.scheduledStartTime)}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="gradient"
                        size="lg"
                        className="flex-1 sm:flex-none gap-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
                        asChild
                      >
                        <a
                          href={upcomingSession.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3"
                        >
                          <div className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-md">
                            <Youtube className="w-5 h-5" />
                            <span className="font-semibold">Watch on YouTube</span>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="flex-1 sm:flex-none gap-2 border-2 hover:border-primary/50 transition-all duration-300"
                      >
                        {/* <Link to="/sessions" className="flex items-center gap-2">
                          <span className="font-semibold">View All Sessions</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link> */}
                        <div onClick={() => {
                          const shareData = {
                            title: upcomingSession.title,
                            text: 'Join me for this upcoming live session!',
                            url: upcomingSession.url,
                          };
                          if (navigator.share) {
                            navigator.share(shareData).catch((err) => console.error('Error sharing:', err));
                          } else {
                            // Fallback: copy to clipboard
                            navigator.clipboard.writeText(upcomingSession.url).then(() => {
                              alert('Session link copied to clipboard!');
                            });
                          }
                        }} className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-md">
                          <span className="font-semibold">Share</span>
                          <Share className="w-4 h-4" />
                        </div>
                      </Button>

                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={fetchUpcomingLiveSessions}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Refresh
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {error && upcomingSession?.id.startsWith('fallback') && (
                <div className="absolute bottom-4 right-4">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2">
                    <p className="text-sm text-yellow-600">
                      Showing sample data • {error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}