import React, { useState, useEffect, useCallback } from 'react';
import { Play, Clock, Eye, ThumbsUp, BookOpen, Code, Trophy, Calendar, User, Search, Filter, Star, Bookmark, TrendingUp, Zap, Loader, Youtube } from 'lucide-react';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const VideoRecommender = () => {
  const [currentPage, setCurrentPage] = useState('recommendations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('react tutorials');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteVideos, setFavoriteVideos] = useState(new Set());
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [nextPageToken, setNextPageToken] = useState('');


 

  
  const categories = [
    { id: 'react tutorials', name: 'React', icon: '⚛️', query: 'react js tutorial 2024' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', query: 'javascript tutorial advanced' },
    { id: 'css', name: 'CSS', icon: '🎨', query: 'css tutorial modern techniques' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢', query: 'nodejs tutorial backend' },
    { id: 'typescript', name: 'TypeScript', icon: '💙', query: 'typescript tutorial complete guide' },
    { id: 'python', name: 'Python', icon: '🐍', query: 'python programming tutorial' },
    { id: 'webdev', name: 'Web Dev', icon: '🌐', query: 'web development tutorial full stack' },
    { id: 'algorithms', name: 'Algorithms', icon: '🧮', query: 'data structures algorithms programming' }
  ];

  
  const demoVideos = [
    {
      id: { videoId: '1' },
      snippet: {
        title: "React 18 Complete Tutorial - Build Modern Apps",
        description: "Learn React 18 with all the latest features including concurrent rendering, suspense, and automatic batching.",
        thumbnails: { high: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=360&fit=crop" }},
        channelTitle: "React Mastery",
        publishedAt: "2024-01-15T10:00:00Z"
      },
      statistics: { viewCount: "127000", likeCount: "8200" }
    },
    {
      id: { videoId: '2' },
      snippet: {
        title: "JavaScript ES2024 New Features You Need to Know",
        description: "Explore the latest JavaScript features and how to use them in your projects.",
        thumbnails: { high: { url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=480&h=360&fit=crop" }},
        channelTitle: "JS Weekly",
        publishedAt: "2024-01-10T14:30:00Z"
      },
      statistics: { viewCount: "203000", likeCount: "12400" }
    },
    {
      id: { videoId: '3' },
      snippet: {
        title: "CSS Grid vs Flexbox - Complete Comparison Guide",
        description: "When to use CSS Grid vs Flexbox with practical examples and best practices.",
        thumbnails: { high: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=360&fit=crop" }},
        channelTitle: "CSS Ninja",
        publishedAt: "2024-01-08T09:15:00Z"
      },
      statistics: { viewCount: "89000", likeCount: "5100" }
    }
  ];

  
  const formatCount = (count) => {
    const num = parseInt(count) || 0;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

 
  const formatDuration = (duration) => {
    if (!duration) return '0:00';
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  
  const fetchVideos = useCallback(async (query, pageToken = '') => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
     
      setLoading(true);
      setTimeout(() => {
        setVideos(demoVideos);
        setLoading(false);
      }, 500);
      return;
    }

    setLoading(true);
    try {
     
      const searchResponse = await fetch(
        `${YOUTUBE_API_BASE}/search?` +
        `key=${YOUTUBE_API_KEY}&` +
        `q=${encodeURIComponent(query)}&` +
        `type=video&` +
        `part=snippet&` +
        `maxResults=12&` +
        `order=relevance&` +
        `videoDuration=medium&` +
        `publishedAfter=2023-01-01T00:00:00Z&` +
        `${pageToken ? `pageToken=${pageToken}&` : ''}`
      );

      const searchData = await searchResponse.json();
      
      if (searchData.items) {
       
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      
        const statsResponse = await fetch(
          `${YOUTUBE_API_BASE}/videos?` +
          `key=${YOUTUBE_API_KEY}&` +
          `id=${videoIds}&` +
          `part=statistics,contentDetails`
        );

        const statsData = await statsResponse.json();

       
        const videosWithStats = searchData.items.map(video => {
          const stats = statsData.items?.find(stat => stat.id === video.id.videoId);
          return {
            ...video,
            statistics: stats?.statistics || { viewCount: '0', likeCount: '0' },
            contentDetails: stats?.contentDetails || { duration: 'PT0S' }
          };
        });

        setVideos(pageToken ? [...videos, ...videosWithStats] : videosWithStats);
        setNextPageToken(searchData.nextPageToken || '');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
     
      setVideos(demoVideos);
    }
    setLoading(false);
  }, [videos, YOUTUBE_API_KEY]);

  
  useEffect(() => {
    const currentQuery = searchQuery || categories.find(cat => cat.id === selectedCategory)?.query || 'web development tutorial';
    fetchVideos(currentQuery);
  }, [selectedCategory]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchVideos(searchQuery.trim());
    }
  };

  
  const loadMoreVideos = () => {
    if (nextPageToken) {
      const currentQuery = searchQuery || categories.find(cat => cat.id === selectedCategory)?.query || 'web development tutorial';
      fetchVideos(currentQuery, nextPageToken);
    }
  };

  const toggleFavorite = (videoId) => {
    const newFavorites = new Set(favoriteVideos);
    if (newFavorites.has(videoId)) {
      newFavorites.delete(videoId);
    } else {
      newFavorites.add(videoId);
    }
    setFavoriteVideos(newFavorites);
  };

  const markAsWatched = (videoId) => {
    const newWatched = new Set(watchedVideos);
    newWatched.add(videoId);
    setWatchedVideos(newWatched);
  };

 
  const studentData = {
    name: "Alex Johnson",
    level: "Intermediate Developer",
    completedCourses: 12,
    totalWatchTime: "147 hours",
    streak: 15,
    watchedCount: watchedVideos.size,
    favoriteCount: favoriteVideos.size,
    achievements: [
      { name: "React Master", icon: "🏆", earned: true },
      { name: "CSS Wizard", icon: "🎨", earned: true },
      { name: "JavaScript Pro", icon: "⚡", earned: watchedVideos.size >= 5 },
      { name: "Video Collector", icon: "📚", earned: favoriteVideos.size >= 3 }
    ]
  };

  const VideoCard = ({ video }) => {
    const videoId = video.id.videoId || video.id;
    const isWatched = watchedVideos.has(videoId);
    const isFavorited = favoriteVideos.has(videoId);

    return (
      <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
        <div className="relative overflow-hidden">
          <img 
            src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url} 
            alt={video.snippet.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => markAsWatched(videoId)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </a>
          </div>
          
          {video.contentDetails && (
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm font-medium">
              {formatDuration(video.contentDetails.duration)}
            </div>
          )}
          
          <button
            onClick={() => toggleFavorite(videoId)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
          >
            <Bookmark 
              className={`w-4 h-4 ${isFavorited ? 'text-red-600 fill-current' : 'text-gray-600'}`} 
            />
          </button>

          {isWatched && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Watched
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-3">
            {video.snippet.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-red-600 font-semibold text-sm flex items-center gap-1">
              <Youtube className="w-4 h-4" />
              {video.snippet.channelTitle}
            </span>
            <span className="text-gray-500 text-xs">
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatCount(video.statistics.viewCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{formatCount(video.statistics.likeCount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RecommendationsPage = () => (
    <div className="video-recommendations-page min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
     
      <header className="video-recommendations-header bg-white shadow-lg border-b border-gray-200">
        <div className="recommendations-header-inner max-w-7xl mx-auto px-6 py-4">
          <div className="recommendations-header-layout flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-xl">
                <Youtube className="w-8 h-8 text-white" />
              </div>
             
            </div>
            
            <div className="recommendations-header-controls flex items-center gap-4">
              <form onSubmit={handleSearch} className="recommendations-search relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search YouTube videos..."
                  className="recommendations-search-input pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      
      {(!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mx-6 mt-4 rounded">
          <p className="font-medium">Demo Mode Active</p>
          <p className="text-sm">Add your YouTube API key to fetch live videos. Currently showing sample data.</p>
        </div>
      )}

      
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <Loader className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading videos...</p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <VideoCard key={`${video.id.videoId || video.id}-${index}`} video={video} />
            ))}
          </div>
          
          {/* Load More Button */}
          {nextPageToken && !loading && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreVideos}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Load More Videos
              </button>
            </div>
          )}
          
          {videos.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-8 shadow-lg inline-block">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-600">Try a different search term or category.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const DashboardPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Student Dashboard
                </h1>
                <p className="text-gray-600 text-sm">Track your learning progress</p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentPage('recommendations')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Youtube className="w-5 h-5" />
              Browse Videos
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentData.name}! 👋</h2>
              <p className="text-xl text-gray-600">{studentData.level}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Zap className="w-6 h-6" />
                <span className="text-2xl font-bold">{studentData.streak}</span>
              </div>
              <p className="text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Videos Watched</p>
                <p className="text-3xl font-bold">{studentData.watchedCount}</p>
              </div>
              <Play className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 mb-1">Favorites</p>
                <p className="text-3xl font-bold">{studentData.favoriteCount}</p>
              </div>
              <Bookmark className="w-12 h-12 text-red-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Watch Time</p>
                <p className="text-3xl font-bold">{studentData.totalWatchTime}</p>
              </div>
              <Clock className="w-12 h-12 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Learning Streak</p>
                <p className="text-3xl font-bold">{studentData.streak}</p>
              </div>
              <Zap className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentData.achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                achievement.earned 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{achievement.name}</h4>
                  <p className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                    {achievement.earned ? 'Earned!' : 'In Progress'}
                  </p>
                </div>
                {achievement.earned && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }
  return <RecommendationsPage />;
};

export default VideoRecommender;