import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, Smile } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import EmojiPicker from 'emoji-picker-react';
import './ThreadCard.css';

const ThreadCard = ({ thread }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [threadData, setThreadData] = useState({
    ...thread,
    replies: thread.replies?.map(reply => ({
      ...reply,
      likes: reply.likes || [],
      dislikes: reply.dislikes || [],
      userLiked: reply.userLiked || false,
      userDisliked: reply.userDisliked || false
    })) || []
  });
  const [isSaved, setIsSaved] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  // Determine if this is a trending topic or regular category post
  const isTrendingTopic = Boolean(threadData.topic);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setThreadData({
      ...thread,
      replies: thread.replies?.map(reply => ({
        ...reply,
        likes: reply.likes || [],
        dislikes: reply.dislikes || [],
        userLiked: reply.userLiked || false,
        userDisliked: reply.userDisliked || false
      })) || []
    });
  }, [thread]);

  const redirectToLogin = () => {
    navigate('/login');
  };

  // ... rest of the functions remain the same ...

  return (
    <div className="thread-card">
      <div className="thread-header">
        <img
          src={threadData.author.image || "/default-avatar.png"}
          alt="Author avatar"
          className="thread-author-avatar"
        />
        <div className="thread-author-info">
          <span className="thread-author-name">{threadData.author.name}</span>
          <span className="thread-date">
            {new Date(threadData.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="thread-content">
        {threadData.content}
      </div>

      <div className="thread-actions">
        <button
          className={\`action-button \${threadData.userLiked ? 'active' : ''}\`}
          onClick={handleLike}
        >
          <ThumbsUp size={20} />
          <span>{threadData.likes?.length || 0}</span>
        </button>

        <button
          className={\`action-button \${threadData.userDisliked ? 'active' : ''}\`}
          onClick={handleDislike}
        >
          <ThumbsDown size={20} />
          <span>{threadData.dislikes?.length || 0}</span>
        </button>

        <button
          className="action-button"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <MessageSquare size={20} />
          <span>{threadData.replies?.length || 0}</span>
        </button>

        <button className="action-button" onClick={handleShare}>
          <Share2 size={20} />
        </button>

        <button
          className={\`action-button \${isSaved ? 'active' : ''}\`}
          onClick={handleSave}
        >
          <Bookmark size={20} />
        </button>
      </div>

      {showReplyForm && (
        <div className="reply-form">
          <textarea
            className="reply-input"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="reply-actions">
            <button
              className="emoji-picker-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </button>
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitReply}
              >
                Reply
              </button>
            </div>
          </div>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker
                onEmojiClick={(emojiObject) => handleEmojiSelect(emojiObject)}
              />
            </div>
          )}
        </div>
      )}

      {threadData.replies && threadData.replies.length > 0 && (
        <div className="reply-list">
          {threadData.replies.map((reply) => (
            <div key={reply._id} className="reply-card">
              <div className="thread-header">
                <img
                  src={reply.author.image || "/default-avatar.png"}
                  alt="Reply author avatar"
                  className="thread-author-avatar"
                />
                <div className="thread-author-info">
                  <span className="thread-author-name">{reply.author.name}</span>
                  <span className="thread-date">
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="thread-content">
                {reply.content}
              </div>
              <div className="thread-actions">
                <button
                  className={\`action-button \${reply.userLiked ? 'active' : ''}\`}
                  onClick={() => handleReplyLike(reply._id)}
                >
                  <ThumbsUp size={20} />
                  <span>{reply.likes?.length || 0}</span>
                </button>
                <button
                  className={\`action-button \${reply.userDisliked ? 'active' : ''}\`}
                  onClick={() => handleReplyDislike(reply._id)}
                >
                  <ThumbsDown size={20} />
                  <span>{reply.dislikes?.length || 0}</span>
                </button>
                <button
                  className="action-button"
                  onClick={() => handleReplyShare(reply._id)}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadCard; 