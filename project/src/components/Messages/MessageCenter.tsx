import React, { useState } from 'react';
import { Send, Search, Paperclip, User } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

export default function MessageCenter() {
  const { messages, addMessage } = useData();
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState({
    recipientId: '',
    recipientName: '',
    subject: '',
    content: '',
  });
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userMessages = messages.filter(
    message => message.senderId === user?.id || message.recipientId === user?.id
  );

  const filteredMessages = userMessages.filter(
    message =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMessage({
      senderId: user?.id || '',
      senderName: user?.name || '',
      ...newMessage,
    });
    
    setNewMessage({
      recipientId: '',
      recipientName: '',
      subject: '',
      content: '',
    });
    setShowCompose(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <button
          onClick={() => setShowCompose(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Send className="h-4 w-4" />
          <span>Compose</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage === message.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {message.senderId === user?.id ? `To: ${message.recipientName}` : `From: ${message.senderName}`}
                    </p>
                    <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!message.read && message.recipientId === user?.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content or Compose */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          {showCompose ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Compose Message</h2>
                <button
                  onClick={() => setShowCompose(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To (Email)
                  </label>
                  <input
                    type="email"
                    value={newMessage.recipientName}
                    onChange={(e) => setNewMessage({ ...newMessage, recipientName: e.target.value, recipientId: 'temp-id' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="recipient@school.edu"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Message subject"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message here..."
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span>Attach File</span>
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6">
              {selectedMessage ? (
                (() => {
                  const message = messages.find(m => m.id === selectedMessage);
                  return message ? (
                    <div>
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">{message.subject}</h2>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>From: {message.senderName}</span>
                          <span>To: {message.recipientName}</span>
                          <span>{new Date(message.sentAt).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="prose max-w-none">
                        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
                          <div className="space-y-2">
                            {message.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center space-x-2 text-sm">
                                <Paperclip className="h-4 w-4 text-gray-400" />
                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                  {attachment.name}
                                </span>
                                <span className="text-gray-500">
                                  ({(attachment.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>Message not found</div>
                  );
                })()
              ) : (
                <div className="text-center py-12">
                  <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                  <p className="text-gray-500">Choose a message from the list to view its content</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}