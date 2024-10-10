"use client";
import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext'; // Adjust the import path as necessary

const MessageForm = () => {
  const [messageText, setMessageText] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [voiceMessage, setVoiceMessage] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  // Use the AuthContext to get the token
  const authContext = useContext(AuthContext);

  // Check if authContext is null and handle it
  if (!authContext) {
    return <p className="text-red-500 text-center">Auth context is not available.</p>;
  }

  const { getToken } = authContext; // Now it's safe to use getToken

  const formatScheduledTimeToUTC = (localTime: string) => {
    const date = new Date(localTime);
    const utcYear = date.getUTCFullYear();
    const utcMonth = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const utcDay = ('0' + date.getUTCDate()).slice(-2);
    const utcHours = ('0' + date.getUTCHours()).slice(-2);
    const utcMinutes = ('0' + date.getUTCMinutes()).slice(-2);
    const utcSeconds = ('0' + date.getUTCSeconds()).slice(-2);
    return `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message_text', messageText);
    const formattedTimeUTC = formatScheduledTimeToUTC(scheduledTime);
    formData.append('scheduled_time', formattedTimeUTC);
    if (voiceMessage) {
      formData.append('voice_message', voiceMessage);
    }

    try {
      const token = getToken(); // Now we can safely get the token
      const response = await fetch('http://127.0.0.1:8000/message/schedule/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`, // Use the retrieved token
        },
        body: formData,
      });

      if (response.ok) {
        setStatus('Message scheduled successfully!');
      } else {
        const data = await response.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 my-8 bg-gradient-to-r from-cyan-400 to-pink-400 shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Schedule a Message</h2>

      <div className="mb-6">
        <label htmlFor="message_text" className="block text-white font-semibold mb-2">Message Text</label>
        <textarea
          id="message_text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="w-full px-4 py-2 border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="scheduled_time" className="block text-white font-semibold mb-2">Scheduled Time (UTC)</label>
        <input
          type="datetime-local"
          id="scheduled_time"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="w-full px-4 py-2 border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="voice_message" className="block text-white font-semibold mb-2">Voice Message</label>
        <input
          type="file"
          id="voice_message"
          onChange={(e) => setVoiceMessage(e.target.files ? e.target.files[0] : null)}
          accept="audio/*"
          className="w-full px-4 py-2 border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <button type="submit" className="w-full bg-white text-cyan-600 font-semibold py-2 rounded-md shadow-md hover:bg-cyan-200 transition duration-300">
        Submit
      </button>

      {status && <p className="mt-4 text-white text-center">{status}</p>}
    </form>
  );
};

export default MessageForm;
