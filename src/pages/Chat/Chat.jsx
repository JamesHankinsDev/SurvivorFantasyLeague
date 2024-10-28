import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    socket.on('group-message', (message) => {
      setMessages((prev) => [...prev, { type: 'group', message }]);
    });

    socket.on('direct-message', ({ from, message }) => {
      setMessages((prev) => [...prev, { type: 'direct', from, message }]);
    });

    return () => {
      socket.off('group-message');
      socket.off('direct-message');
    };
  }, []);

  const handleSendMessage = () => {
    if (isDirectMessage && recipientId) {
      socket.emit('direct-message', { to: recipientId, message: inputMessage });
      setMessages((prev) => [
        ...prev,
        { type: 'sent-direct', to: recipientId, message: inputMessage },
      ]);
    } else {
      socket.emit('group-message', inputMessage);
      setMessages((prev) => [
        ...prev,
        { type: 'group', message: inputMessage },
      ]);
    }

    setInputMessage('');
  };

  return (
    <>
      <h1>Welcome to the Chat Boards!</h1>
      <div className={'messages'}>
        {messages.map((msg, index) => (
          <div
            key={`message_${index}`}
            className={
              msg.type === 'direct' ? 'direct-message' : 'group-message'
            }
          >
            {msg.type === 'direct' ? (
              <p>
                <strong>Direct message from {msg.from}:</strong> {msg.message}
              </p>
            ) : (
              <p>{msg.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className={'input-controls'}>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        {isDirectMessage && (
          <input
            type="text"
            placeholder="Recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        )}
        <button onClick={handleSendMessage}>Send</button>

        <iv>
          <label>
            <input
              type="checkbox"
              checked={isDirectMessage}
              onChange={(e) => setIsDirectMessage(e.target.checked)}
            />
            Send as Direct Message
          </label>
        </iv>
      </div>
    </>
  );
}
