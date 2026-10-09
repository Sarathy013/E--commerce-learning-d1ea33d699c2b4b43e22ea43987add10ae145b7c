import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, Send, User, Clock } from 'lucide-react';

// Discussion Component
const Discussion = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Alice Johnson',
      content: 'What are your thoughts on the latest React 18 features? The concurrent rendering seems really promising!',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: 101,
          author: 'Bob Smith',
          content: 'I love the automatic batching feature. It makes state updates much more efficient.',
          timestamp: '1 hour ago',
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: 'Charlie Brown',
      content: 'Has anyone tried the new useId hook? I\'m curious about its use cases in real applications.',
      timestamp: '4 hours ago',
      likes: 8,
      replies: []
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [showReplyForms, setShowReplyForms] = useState({});

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: 'Current User',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        replies: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId, isReply = false, replyId = null) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (isReply && post.id === postId) {
          return {
            ...post,
            replies: post.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          };
        } else if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const handleReply = (postId) => {
    const replyText = replyTexts[postId];
    if (replyText && replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: 'Current User',
        content: replyText,
        timestamp: 'Just now',
        likes: 0
      };

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, replies: [...post.replies, reply] }
            : post
        )
      );

      setReplyTexts({ ...replyTexts, [postId]: '' });
      setShowReplyForms({ ...showReplyForms, [postId]: false });
    }
  };

  const toggleReplyForm = (postId) => {
    setShowReplyForms({
      ...showReplyForms,
      [postId]: !showReplyForms[postId]
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <MessageCircle className="text-blue-600" size={32} />
          Discussion Forum
        </h1>
        <p className="text-gray-600">Share your thoughts and engage with the community</p>
      </div>

      {/* New Post Form */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Start a Discussion</h2>
        <div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind? Share your thoughts..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitPost}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Post Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{post.author}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  {post.timestamp}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pb-4 border-b border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart size={18} />
                <span>{post.likes} likes</span>
              </button>
              <button
                onClick={() => toggleReplyForm(post.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Reply size={18} />
                <span>Reply</span>
              </button>
            </div>

            {/* Reply Form */}
            {showReplyForms[post.id] && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <textarea
                  value={replyTexts[post.id] || ''}
                  onChange={(e) => setReplyTexts({ ...replyTexts, [post.id]: e.target.value })}
                  placeholder="Write your reply..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => toggleReplyForm(post.id)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(post.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send size={14} />
                    Reply
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="mt-4 space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="ml-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{reply.author}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={12} />
                          {reply.timestamp}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{reply.content}</p>
                    <button
                      onClick={() => handleLike(post.id, true, reply.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-sm"
                    >
                      <Heart size={16} />
                      <span>{reply.likes} likes</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No discussions yet</h3>
          <p className="text-gray-500">Be the first to start a conversation!</p>
        </div>
      )}
    </div>
  );
};

export   default Discussion ;