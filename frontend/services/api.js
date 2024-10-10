// services/api.js
import axios from "axios";

export const API_URL = "http://127.0.0.1:8000"; // Update with your Django API URL

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/otp-login/`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // Or handle the error gracefully within your UI
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/otp-login/`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const googleLogin = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/google-login/`, {
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error in Google login:", error);
    throw error;
  }
};



export const generateVideo = async (topic, file, captionOptions = {}) => {
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('fontsize', captionOptions.fontsize || 100);
  formData.append('color', captionOptions.color || 'white');
  formData.append('stroke_width', captionOptions.stroke_width || 3);
  formData.append('stroke_color', captionOptions.stroke_color || 'black');

  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/generate/generate_video/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${localStorage.getItem('authToken')}` // Changed to Bearer token
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};

export const generateVideoFromAudio = async (audioFile, captionOptions = {}) => {
  const formData = new FormData();

  // Ensure audioFile is the File object, not an array
  if (Array.isArray(audioFile) && audioFile.length > 0) {
    audioFile = audioFile[0];
  }

  // Log the audio file details for debugging
  console.log('Audio file being sent:', audioFile);

  formData.append('audio_file', audioFile, audioFile.name);

  // Append caption options
  formData.append('fontsize', captionOptions.fontsize || 100);
  formData.append('color', captionOptions.color || 'white');
  formData.append('stroke_width', captionOptions.stroke_width || 3);
  formData.append('stroke_color', captionOptions.stroke_color || 'black');

  // Append additional options if needed
  if (captionOptions.style) {
    formData.append('caption_style', captionOptions.style);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/generate/generate-video-from-audio/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${localStorage.getItem('authToken')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating video from audio:', error);
    throw error;
  }
};

export const generateCaptions = async (videoFile, captionOptions = {}) => {
  const formData = new FormData();

  // Ensure videoFile is the File object, not an array
  if (Array.isArray(videoFile) && videoFile.length > 0) {
    videoFile = videoFile[0];
  }

  // Log the video file details for debugging
  console.log('Video file being sent:', videoFile);

  formData.append('video', videoFile, videoFile.name);

  // Append caption options
  formData.append('style', captionOptions.style || 'default');
  formData.append('model_size', captionOptions.model_size || 'base');
  formData.append('font_size', captionOptions.font_size || 36);
  formData.append('text_color', captionOptions.text_color || 'white');
  formData.append('stroke_color', captionOptions.stroke_color || 'black');
  formData.append('font_weight', captionOptions.font_weight || 'bold');
  formData.append('stroke_width', captionOptions.stroke_width || 2);

  // Append target language if provided
  if (captionOptions.target_language) {
    formData.append('target_language', captionOptions.target_language);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/generate/generate_captions/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${localStorage.getItem('authToken')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating captions:', error);
    throw error;
  }
};

export const translateVideo = async (videoFile, captionOptions = {}) => {
  const formData = new FormData();

  // Ensure videoFile is the File object, not an array
  if (Array.isArray(videoFile) && videoFile.length > 0) {
    videoFile = videoFile[0];
  }

  // Log the video file details for debugging
  console.log('Video file being sent:', videoFile);

  formData.append('video', videoFile, videoFile.name);

  // Append caption options
  formData.append('style', captionOptions.style || 'default');
  formData.append('model_size', captionOptions.model_size || 'base');
  formData.append('font_size', captionOptions.font_size || 36);
  formData.append('text_color', captionOptions.text_color || 'white');
  formData.append('stroke_color', captionOptions.stroke_color || 'black');
  formData.append('font_weight', captionOptions.font_weight || 'bold');
  formData.append('stroke_width', captionOptions.stroke_width || 2);

  // Append target language if provided
  if (captionOptions.target_language) {
    formData.append('target_language', captionOptions.target_language);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/generate/generate_captions/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${localStorage.getItem('authToken')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating captions:', error);
    throw error;
  }
};


export const createCheckoutSession = async (priceId) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if the user is logged in
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    headers['Authorization'] = `token ${authToken}`;
  }

  try {
    const r = await axios.post(
      'http://127.0.0.1:8000/subscriptions/create-checkout-session/',
      { price_id: priceId },
      { headers }
    );

    window.location = r.data.redirect_url

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// A New Line Added