import React, { useState, useEffect } from 'react';

const VideoLibrary = () => {
  // State management
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentTab, setCurrentTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Video data
  const videos = [
    {
      id: 1,
      title: "React Hooks Deep Dive: useState & useEffect",
      category: "react",
      instructor: "Alex Johnson",
      duration: "45:30",
      views: 45678,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&crop=center",
      progress: 80,
      level: "Intermediate",
      techStack: ["React", "JavaScript", "Hooks"],
      codeSnippet: "const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
      date: "2 days ago",
      description: "Master React Hooks with practical examples. Learn useState, useEffect, and custom hooks with real-world applications."
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features You Must Know",
      category: "javascript",
      instructor: "Maria Garcia",
      duration: "1:15:20",
      views: 67890,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db8a?w=400&h=225&fit=crop&crop=center",
      progress: 100,
      level: "Intermediate",
      techStack: ["JavaScript", "ES6+", "Modern JS"],
      codeSnippet: "const greet = (name = 'World') => `Hello, ${name}!`;\nconst [a, b, ...rest] = [1, 2, 3, 4, 5];",
      date: "1 week ago",
      description: "Comprehensive guide to modern JavaScript features including arrow functions, destructuring, spread operator, and more."
    },
    {
      id: 3,
      title: "Build Full Stack App with MERN Stack",
      category: "fullstack",
      instructor: "David Chen",
      duration: "2:30:45",
      views: 34567,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
      progress: 45,
      level: "Advanced",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      codeSnippet: "app.get('/api/users', async (req, res) => {\n  const users = await User.find();\n  res.json(users);\n});",
      date: "3 days ago",
      description: "Build a complete full-stack application from scratch using MongoDB, Express, React, and Node.js. Includes authentication and deployment."
    },
    {
      id: 4,
      title: "UI/UX Design Principles for Developers",
      category: "uiux",
      instructor: "Sophie Williams",
      duration: "55:15",
      views: 23456,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop&crop=center",
      progress: 0,
      level: "Beginner",
      techStack: ["Figma", "Design Systems", "UI Principles"],
      codeSnippet: "// Design System Colors\nconst colors = {\n  primary: '#3B82F6',\n  secondary: '#10B981',\n  neutral: '#6B7280'\n};",
      date: "5 days ago",
      description: "Learn essential UI/UX design principles that every developer should know. Create beautiful and user-friendly interfaces."
    },
    {
      id: 5,
      title: "Advanced React Patterns: HOC & Render Props",
      category: "react",
      instructor: "John Smith",
      duration: "1:20:30",
      views: 28901,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
      progress: 60,
      level: "Advanced",
      techStack: ["React", "Patterns", "Architecture"],
      codeSnippet: "const withAuth = (WrappedComponent) => {\n  return (props) => {\n    return <WrappedComponent {...props} user={user} />;\n  };\n};",
      date: "4 days ago",
      description: "Master advanced React patterns including Higher-Order Components (HOC), Render Props, and Compound Components."
    },
    {
      id: 6,
      title: "JavaScript Async/Await Masterclass",
      category: "javascript",
      instructor: "Emma Brown",
      duration: "1:05:45",
      views: 56789,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop&crop=center",
      progress: 90,
      level: "Intermediate",
      techStack: ["JavaScript", "Async", "Promises"],
      codeSnippet: "async function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
      date: "1 day ago",
      description: "Master asynchronous JavaScript with Async/Await. Handle promises, errors, and parallel operations effectively."
    }
  ];

  // Initialize video data
  useEffect(() => {
    setVideoData(videos);
  }, []);

  // Filter videos based on current state
  const getFilteredVideos = () => {
    let filtered = videoData;

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(v => v.category === currentCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tab
    if (currentTab === 'continue') {
      filtered = filtered.filter(v => v.progress > 0 && v.progress < 100).sort((a, b) => b.progress - a.progress);
    } else if (currentTab === 'projects') {
      filtered = filtered.filter(v => v.title.includes('Build') || v.title.includes('Project') || v.title.includes('App'));
    } else if (currentTab === 'advanced') {
      filtered = filtered.filter(v => v.level === 'Advanced');
    } else if (currentTab === 'playlists') {
      filtered = filtered.filter(v => v.progress === 100);
    }

    return filtered;
  };

  // Open video modal
  const openVideoModal = (videoId) => {
    const video = videoData.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  // Close video modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Categories data
  const categories = [
    { id: 'all', name: 'All Courses', count: 156 },
    { id: 'javascript', name: 'JavaScript', count: 42 },
    { id: 'react', name: 'React', count: 38 },
    { id: 'fullstack', name: 'Full Stack', count: 45 },
    { id: 'uiux', name: 'UI/UX', count: 31 },
  ];

  // Tabs data
  const tabs = [
    { id: 'trending', name: 'Trending Now' },
    { id: 'continue', name: 'Continue Learning' },
    { id: 'projects', name: 'Project Based' },
    { id: 'advanced', name: 'Advanced Topics' },
    { id: 'playlists', name: 'My Playlists' },
  ];

  const filteredVideos = getFilteredVideos();

  return (
    <div className="video-library-page min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                ☰
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                  <span className="text-white text-xl">💻</span>
                </div>
                <h1 className="ml-3 text-2xl font-bold text-gray-900"></h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search React, JS, Full Stack, UI/UX..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
           
            </div>
          </div>
        </div>
      </header>

      <div className="video-library-layout flex flex-1 min-w-0">
        {/* Sidebar */}
        <aside className={`w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static h-full z-30`}>
          <div className="p-6">
            {/* Programming Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setCurrentCategory(category.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                      currentCategory === category.id
                        ? 'bg-orange-50 text-orange-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      currentCategory === category.id
                        ? 'bg-orange-700 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-shadow duration-300 mb-2">
                ➕ Create Project
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                📥 Download Resources
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="video-library-main flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Search */}
            <div className="md:hidden mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search programming topics..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Videos</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <span className="text-orange-600 text-xl">📹</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">67</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <span className="text-yellow-600 text-xl">⏰</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Code Written</p>
                    <p className="text-2xl font-bold text-gray-900">12.5k</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <span className="text-purple-600 text-xl">💻</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <nav className="flex space-x-8 border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      currentTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1"
                  onClick={() => openVideoModal(video.id)}
                >
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                    {video.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                        <div 
                          className={`${video.progress === 100 ? 'bg-green-600' : 'bg-orange-500'} h-1 transition-all duration-300`} 
                          style={{ width: `${video.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{video.instructor}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        video.level === 'Beginner' ? 'bg-blue-100 text-blue-700' : 
                        video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {video.level}
                      </span>
                      <span className="text-xs text-gray-500">
                        👁️ {video.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {video.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {video.techStack.length > 3 && (
                        <span className="text-xs text-gray-500">+{video.techStack.length - 3}</span>
                      )}
                    </div>
                    {video.progress > 0 && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Progress: {video.progress === 100 ? 'Completed' : `${video.progress}%`}
                        </span>
                        {video.progress < 100 ? (
                          <span className="text-orange-600">▶️</span>
                        ) : (
                          <span className="text-green-600">✅</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Load More Button */}
            {filteredVideos.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  ➕ Load More Videos
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-75" onClick={closeModal}></div>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ✕
                </button>
              </div>
              
              {/* Video Player */}
              <div className="relative bg-black aspect-video">
                <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200">
                    <span className="text-2xl text-gray-900">▶️</span>
                  </button>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>👁️ {selectedVideo.views.toLocaleString()} views</span>
                      <span>⏰ {selectedVideo.duration}</span>
                      <span>📊 {selectedVideo.level}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{selectedVideo.description}</p>
                    
                    {/* Code Snippet Preview */}
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 text-xs overflow-x-auto">
                      <pre><code>{selectedVideo.codeSnippet}</code></pre>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedVideo.techStack.map((tech) => (
                        <span key={tech} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="text-red-600 hover:text-red-700 text-2xl">
                      ❤️
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 text-2xl">
                      🔖
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-2xl">
                      📤
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Learning Progress</span>
                    <span>{selectedVideo.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${selectedVideo.progress === 100 ? 'bg-green-600' : 'bg-orange-500'} h-2 rounded-full transition-all duration-300`} 
                      style={{ width: `${selectedVideo.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
                    ▶️ Start Coding
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    📁 Add to Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;