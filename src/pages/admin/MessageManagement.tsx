import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import './MessageManagement.css';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const MessageManagement: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await apiService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiService.markMessageAsRead(id);
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await apiService.deleteMessage(id);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.isRead;
    if (filter === 'read') return message.isRead;
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="message-management">
      <div className="management-header">
        <h1>Contact Messages</h1>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({messages.length})
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread ({messages.filter(m => !m.isRead).length})
          </button>
          <button 
            className={filter === 'read' ? 'active' : ''}
            onClick={() => setFilter('read')}
          >
            Read ({messages.filter(m => m.isRead).length})
          </button>
        </div>
      </div>

      <div className="messages-list">
        {filteredMessages.map(message => (
          <div key={message.id} className={`message-card ${!message.isRead ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-info">
                <h3>{message.name}</h3>
                <p>{message.email}</p>
              </div>
              <span className="message-date">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
            
            <div className="message-subject">{message.subject}</div>
            <div className="message-content">{message.message}</div>
            
            <div className="message-actions">
              {!message.isRead && (
                <button 
                  onClick={() => handleMarkAsRead(message.id)}
                  className="btn btn-sm btn-mark-read"
                >
                  Mark as Read
                </button>
              )}
              <button 
                onClick={() => handleDelete(message.id)}
                className="btn btn-sm btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageManagement;
