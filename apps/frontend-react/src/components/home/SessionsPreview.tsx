import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Play, Calendar, Youtube, ExternalLink, Share, AlertCircle, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

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
  cached?: boolean;
  lastUpdated?: string;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string;

// Cache duration in milliseconds (30 minutes = 30 * 60 * 1000)
const CACHE_DURATION = 30 * 60 * 1000;
// Retry delay in milliseconds (5 minutes)
const RETRY_DELAY = 5 * 60 * 1000;

// Cache storage keys
const CACHE_KEYS = {
  SESSION_DATA: 'youtube_session_data',
  SESSION_TIME: 'youtube_session_time',
  API_CALLS_TODAY: 'youtube_api_calls_today',
  LAST_API_ERROR: 'last_api_error_time',
};

// API usage tracker
class APITracker {
  static getTodayKey(): string {
    const today = new Date().toDateString();
    return `${CACHE_KEYS.API_CALLS_TODAY}_${today}`;
  }

  static incrementCall() {
    const key = this.getTodayKey();
    const calls = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (calls + 1).toString());
    return calls + 1;
  }

  static getTodayCalls(): number {
    const key = this.getTodayKey();
    return parseInt(localStorage.getItem(key) || '0');
  }

  static canMakeCall(): boolean {
    const calls = this.getTodayCalls();
    // Limit to 50 calls per day for safety (well below 100 quota)
    return calls < 50;
  }

  static getRemainingCalls(): number {
    return Math.max(0, 50 - this.getTodayCalls());
  }
}

// Cache manager
class SessionCache {
  static getCachedSession(): YouTubeSession | null {
    try {
      const cachedData = localStorage.getItem(CACHE_KEYS.SESSION_DATA);
      const cachedTime = localStorage.getItem(CACHE_KEYS.SESSION_TIME);

      if (!cachedData || !cachedTime) return null;

      const data = JSON.parse(cachedData);
      const time = parseInt(cachedTime);
      const now = Date.now();

      // Check if cache is still valid
      if (now - time < CACHE_DURATION) {
        return { ...data, cached: true, lastUpdated: new Date(time).toLocaleTimeString() };
      }

      return null;
    } catch {
      return null;
    }
  }

  static saveSession(session: YouTubeSession) {
    try {
      localStorage.setItem(CACHE_KEYS.SESSION_DATA, JSON.stringify(session));
      localStorage.setItem(CACHE_KEYS.SESSION_TIME, Date.now().toString());
    } catch (error) {
      console.error('Failed to cache session:', error);
    }
  }

  static clearCache() {
    localStorage.removeItem(CACHE_KEYS.SESSION_DATA);
    localStorage.removeItem(CACHE_KEYS.SESSION_TIME);
  }
}

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
      <div className="aspect-video relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-semibold">UPCOMING</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-youtube/90 backdrop-blur-sm p-2 rounded-lg">
            <Youtube className="w-5 h-5 text-white" />
          </div>
        </div>
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
  const [apiCallsToday, setApiCallsToday] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize API call count
  useEffect(() => {
    setApiCallsToday(APITracker.getTodayCalls());
  }, []);

  // Main data fetching effect
  useEffect(() => {
    loadSessionData();

    // Check cache periodically (every minute)
    const cacheCheckInterval = setInterval(() => {
      const cached = SessionCache.getCachedSession();
      if (cached) {
        setUpcomingSession(cached);
        setLastUpdated(cached.lastUpdated || '');
      }
    }, 60 * 1000);

    return () => clearInterval(cacheCheckInterval);
  }, []);

  const loadSessionData = useCallback(async () => {
    // 1. First check cache
    const cachedSession = SessionCache.getCachedSession();
    if (cachedSession) {
      console.log('📦 Using cached session data');
      setUpcomingSession(cachedSession);
      setLastUpdated(cachedSession.lastUpdated || '');
      setLoading(false);
      setError(null);
      return;
    }

    // 2. Check if we can make API call
    if (!APITracker.canMakeCall()) {
      console.log('⚠️ Daily API limit reached, using fallback');
      setError(`Daily API limit reached (${APITracker.getTodayCalls()}/50 calls). Using cached or sample data.`);
      setFallbackData();
      setLoading(false);
      return;
    }

    // 3. Fetch fresh data
    await fetchUpcomingLiveSessions();
  }, []);

  const fetchUpcomingLiveSessions = useCallback(async () => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY.includes('your_api_key')) {
      setError('YouTube API Key is not configured');
      setFallbackData();
      return;
    }

    if (!CHANNEL_ID) {
      setError('YouTube Channel ID is not configured');
      setFallbackData();
      return;
    }

    try {
      setIsRefreshing(true);
      setError(null);

      console.log('🔄 Fetching fresh session data...');

      // Increment API call counter
      APITracker.incrementCall();
      setApiCallsToday(APITracker.getTodayCalls());

      // Use Promise.race for timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      // Fetch data with timeout
      const searchPromise = axios.get(
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

      const searchResponse = await Promise.race([searchPromise, timeoutPromise]) as any;

      if (searchResponse.data.items?.length > 0) {
        const video = searchResponse.data.items[0];
        const videoId = video.id.videoId;

        // Get video details
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

        if (detailsResponse.data.items?.length > 0) {
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
            cached: false,
            lastUpdated: new Date().toLocaleTimeString(),
          };

          setUpcomingSession(sessionData);
          SessionCache.saveSession(sessionData);
          setLastUpdated(sessionData.lastUpdated!);
          console.log('✅ Fresh data fetched and cached');
        }
      } else {
        setError('No upcoming live sessions scheduled on this channel');
        setFallbackData();
      }

    } catch (err: any) {
      console.error('❌ API Error:', err);

      // Use cached data if available
      const cached = SessionCache.getCachedSession();
      if (cached) {
        console.log('🔄 Falling back to cached data');
        setUpcomingSession(cached);
        setLastUpdated(cached.lastUpdated || '');
        setError('Using cached data (API unavailable)');
      } else {
        setError('Unable to fetch live session data. Using sample data.');
        setFallbackData();
      }

      // Store error time for retry logic
      localStorage.setItem(CACHE_KEYS.LAST_API_ERROR, Date.now().toString());

    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const setFallbackData = () => {
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
      isUpcoming: true,
      cached: true,
      lastUpdated: 'Sample data',
    };

    setUpcomingSession(fallbackSession);
    setLoading(false);
  };

  const getBestThumbnail = (thumbnails: YouTubeSession['thumbnails']) => {
    return thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const handleRefresh = () => {
    if (APITracker.canMakeCall()) {
      fetchUpcomingLiveSessions();
    } else {
      setError(`Daily limit reached. ${APITracker.getRemainingCalls()} calls remaining.`);
    }
  };

  const handleClearCache = () => {
    SessionCache.clearCache();
    setUpcomingSession(null);
    setLoading(true);
    loadSessionData();
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

        {/* API Usage Stats */}
        <Card className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">API Protection Active</p>
                  <p className="text-xs text-blue-700">
                    Calls today: <span className="font-bold">{apiCallsToday}/50</span> •
                    Cache: {upcomingSession?.cached ? '✅ Active' : '❌ Not active'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearCache}
                        className="text-xs"
                      >
                        Clear Cache
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Force fresh API call on next load</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Badge variant="outline" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {lastUpdated || 'Just now'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 max-w-2xl mx-auto"
        >
          <div id='sessions' className="relative rounded-3xl bg-gradient-to-br from-card via-card to-card/95 border border-border/50 overflow-hidden shadow-xl shadow-primary/5">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative backdrop-blur-sm">
              {upcomingSession && (
                <>
                  {upcomingSession.thumbnails && (
                    <ThumbnailWithPlayButton
                      thumbnailUrl={getBestThumbnail(upcomingSession.thumbnails)}
                      title={upcomingSession.title}
                    />
                  )}

                  <div className="px-8 pb-8">
                    {upcomingSession.cached && (
                      <Alert className="mb-6 bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          <span className="font-semibold">Cached Data</span> • Last updated: {lastUpdated} •
                          Auto-refresh in 30 minutes
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && !upcomingSession.cached && (
                      <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <Badge variant="destructive" className="gap-1.5 py-1.5 px-3">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        {upcomingSession.isLive ? 'LIVE NOW' : 'UPCOMING'}
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

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
                      {upcomingSession.title}
                    </h3>

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

                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          {formatFullDateTime(upcomingSession.scheduledStartTime)}
                        </span>
                      </div>
                    </div>

                    {upcomingSession.description && (
                      <div className="mb-8">
                        <p className="text-foreground/80 leading-relaxed line-clamp-3">
                          {upcomingSession.description}
                        </p>
                      </div>
                    )}

                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                        <p className="text-lg font-semibold text-foreground">
                          {upcomingSession.isLive ? 'Live Now!' : 'Session starts in:'}
                        </p>
                      </div>
                      <CountdownTimer
                        targetDate={new Date(upcomingSession.scheduledStartTime)}
                      />
                    </div>

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
                          <Youtube className="w-5 h-5" />
                          <span className="font-semibold">
                            {upcomingSession.isLive ? 'Watch Live' : 'Watch on YouTube'}
                          </span>
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 sm:flex-none gap-2 border-2 hover:border-primary/50 transition-all duration-300"
                        onClick={() => {
                          const shareData = {
                            title: upcomingSession.title,
                            text: 'Join me for this upcoming live session!',
                            url: upcomingSession.url,
                          };
                          if (navigator.share) {
                            navigator.share(shareData).catch((err) => console.error('Error sharing:', err));
                          } else {
                            navigator.clipboard.writeText(upcomingSession.url).then(() => {
                              alert('Session link copied to clipboard!');
                            });
                          }
                        }}
                      >
                        <Share className="w-4 h-4" />
                        Share
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="lg"
                              onClick={handleRefresh}
                              disabled={isRefreshing || !APITracker.canMakeCall()}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {isRefreshing ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <RefreshCw className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {APITracker.canMakeCall()
                                ? `Refresh (${APITracker.getRemainingCalls()} calls left today)`
                                : 'Daily limit reached'
                              }
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}