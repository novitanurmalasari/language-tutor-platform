import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../../types';
import apiService from '../../services/api';
import { formatters } from '../../utils/formatters';
import './AdminMessagesPage.css';

const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

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
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="admin-messages-page">
      <div className="page-header">
        <h1>Messages</h1>
        <p>{messages.filter(m => !m.isRead).length} unread messages</p>
      </div>

      <div className="messages-layout">
        <div className="messages-list">
          {messages.map(message => (
            <div
              key={message.id}
              className={`message-item ${!message.isRead ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.isRead) {
                  handleMarkAsRead(message.id);
                }
              }}
            >
              <div className="message-header">
                <h4>{message.name}</h4>
                <span className="date">{formatters.date(message.createdAt)}</span>
              </div>
              <p className="subject">{message.subject}</p>
              <p className="preview">{message.message.substring(0, 100)}...</p>
            </div>
          ))}
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <>
              <div className="detail-header">
                <h2>{selectedMessage.subject}</h2>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Delete
                </button>
              </div>
              <div className="detail-info">
                <p><strong>From:</strong> {selectedMessage.name}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Date:</strong> {formatters.date(selectedMessage.createdAt)}</p>
              </div>
              <div className="detail-message">
                <p>{selectedMessage.message}</p>
              </div>
              <div className="detail-actions">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn btn-primary"
                >
                  Reply
                </a>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessagesPage;